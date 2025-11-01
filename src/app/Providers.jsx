"use client"
import { ModalProvider } from "@/presentation/context/ModalContext"
import { SessionProvider } from "next-auth/react"

export default function Providers({ children }) {
 return(
    <SessionProvider>
        <ModalProvider>
        {children}
        </ModalProvider>
    </SessionProvider>
 )
}