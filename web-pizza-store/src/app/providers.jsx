'use client'

import { ProductProvider } from '@/hooks/stateProducts'
import {NextUIProvider} from '@nextui-org/react'


export function Providers({children}) {
  return (
    <NextUIProvider>
      <ProductProvider >
        {children}
      </ProductProvider>
    </NextUIProvider>
  )
}