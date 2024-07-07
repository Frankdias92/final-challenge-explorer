'use client'

import { AuthProvider } from '@/hooks/auth'
import { OrdersProvider } from '@/hooks/orderRequest'
import {NextUIProvider} from '@nextui-org/react'


export function Providers({children}) {
  return (
    <NextUIProvider>
        <AuthProvider>
          <OrdersProvider>
            {children}
          </OrdersProvider>
        </AuthProvider>
    </NextUIProvider>
  )
}