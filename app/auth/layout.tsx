import type React from "react"
import { AuthGuard } from "@/components/auth-guard"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="flex min-h-screen">
          {/* Left side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-800 to-orange-900 items-center justify-center p-12">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">DesignTee</h1>
              <p className="text-xl text-amber-100 mb-8">Create, customize, and wear your imagination</p>
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                  <span>AI-powered design tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                  <span>Premium quality materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                  <span>Fast worldwide shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth forms */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
