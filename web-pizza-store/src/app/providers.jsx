'use client'

import { AuthProvider } from '@/hooks/auth'
// import { ProductProvider } from '@/hooks/stateProducts'
import {NextUIProvider} from '@nextui-org/react'


export function Providers({children}) {
  return (
    <NextUIProvider>
      {/* <ProductProvider > */}
        <AuthProvider>
          {children}
        </AuthProvider>
      {/* </ProductProvider> */}
    </NextUIProvider>
  )
}