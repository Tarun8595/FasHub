import { DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import Header from "@/components/header"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
})

export const metadata = {
  title: "FasHub - Elevate Your Style",
  description: "Modern e-commerce clothing store with the latest fashion trends",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body style={{ fontFamily: "var(--font-dm-sans)" }}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pt-24">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
