'use client'

import { AuthProvider } from '@/hooks/auth'
import {NextUIProvider} from '@nextui-org/react'


export function Providers({children}) {
  return (
    <NextUIProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
    </NextUIProvider>
  )
}