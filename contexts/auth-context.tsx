"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db, googleProvider, facebookProvider, instagramProvider } from "@/lib/firebase"

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
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  loginWithInstagram: () => Promise<boolean>
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
      setIsLoading(true)
      
      if (firebaseUser) {
        // Use cached data first for immediate response
        const baseUserData = {
          id: firebaseUser.uid,
          firstName: firebaseUser.displayName?.split(' ')[0] || '',
          lastName: firebaseUser.displayName?.split(' ')[1] || '',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined,
        }
        
        // Set user immediately with basic data
        setUser(baseUserData)
        setIsLoading(false)
        
        // Then fetch additional profile data in background
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          const userProfile = userDoc.data() as UserProfile | undefined
          
          if (userProfile) {
            setUser({
              ...baseUserData,
              firstName: userProfile.firstName || baseUserData.firstName,
              lastName: userProfile.lastName || baseUserData.lastName,
              avatar: userProfile.avatar || baseUserData.avatar,
            })
          }
        } catch (error) {
          // Silently handle errors - we already have basic user data
          console.warn('Could not fetch additional profile data:', error)
        }
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      // Don't wait for navigation, let it happen in background
      setTimeout(() => router.push("/dashboard"), 100)
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

      // Update display name and save to Firestore in parallel
      const [, ] = await Promise.all([
        updateProfile(firebaseUser, {
          displayName: `${userData.firstName} ${userData.lastName}`
        }),
        setDoc(doc(db, 'users', firebaseUser.uid), {
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date()
        } as UserProfile)
      ])

      // Navigate immediately without waiting
      setTimeout(() => router.push("/dashboard"), 100)
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      
      // Create or update user profile in Firestore
      const userRef = doc(db, 'users', result.user.uid)
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        // Extract name from display name
        const displayName = result.user.displayName || ''
        const nameParts = displayName.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        await setDoc(userRef, {
          firstName,
          lastName,
          avatar: result.user.photoURL,
          createdAt: new Date()
        } as UserProfile)
      }
      
      setTimeout(() => router.push("/dashboard"), 100)
      return true
    } catch (error) {
      console.error("Google login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, facebookProvider)
      
      // Create or update user profile in Firestore
      const userRef = doc(db, 'users', result.user.uid)
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        const displayName = result.user.displayName || ''
        const nameParts = displayName.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        await setDoc(userRef, {
          firstName,
          lastName,
          avatar: result.user.photoURL,
          createdAt: new Date()
        } as UserProfile)
      }
      
      setTimeout(() => router.push("/dashboard"), 100)
      return true
    } catch (error) {
      console.error("Facebook login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithInstagram = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, instagramProvider)
      
      // Create or update user profile in Firestore
      const userRef = doc(db, 'users', result.user.uid)
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        const displayName = result.user.displayName || result.user.email?.split('@')[0] || ''
        const nameParts = displayName.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        await setDoc(userRef, {
          firstName,
          lastName,
          avatar: result.user.photoURL,
          createdAt: new Date()
        } as UserProfile)
      }
      
      setTimeout(() => router.push("/dashboard"), 100)
      return true
    } catch (error) {
      console.error("Instagram login failed:", error)
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
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      loginWithGoogle,
      loginWithFacebook,
      loginWithInstagram,
      logout, 
      isLoading 
    }}>
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
