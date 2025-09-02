'use client'

import { usePathname } from 'next/navigation'
import { ToastmastersNavbar } from '@/components/ToastmastersNavbar'
import { Footer } from '@/components/Footer'

interface ConditionalWrapperProps {
  children: React.ReactNode
}

export default function ConditionalWrapper({ children }: ConditionalWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    // For admin routes, don't show navbar or footer
    return <>{children}</>
  }

  // For non-admin routes, show navbar and footer
  return (
    <>
      <ToastmastersNavbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}