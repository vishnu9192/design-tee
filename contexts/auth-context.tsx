"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser 
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

interface UserProfile {
  firstName: string
  lastName: string
  avatar?: string
  createdAt: Date
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          const userProfile = userDoc.data() as UserProfile | undefined
          
          setUser({
            id: firebaseUser.uid,
            firstName: userProfile?.firstName || firebaseUser.displayName?.split(' ')[0] || '',
            lastName: userProfile?.lastName || firebaseUser.displayName?.split(' ')[1] || '',
            email: firebaseUser.email || '',
            avatar: userProfile?.avatar || firebaseUser.photoURL || undefined,
          })
        } catch (error) {
          // Check if error is due to being offline
          if (error instanceof Error && error.message.includes('offline')) {
            console.warn('Currently offline, using cached user data if available');
          } else {
            console.error('Error fetching user profile:', error);
          }
          // Fall back to cached auth data in either case
          setUser({
            id: firebaseUser.uid,
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ')[1] || '',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || undefined,
          });
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      const firebaseUser = userCredential.user

      // Update display name
      await updateProfile(firebaseUser, {
        displayName: `${userData.firstName} ${userData.lastName}`
      })

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date()
      } as UserProfile)

      router.push("/dashboard")
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
