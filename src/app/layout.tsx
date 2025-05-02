import type { Metadata } from 'next'
import './app.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ThemeContextProvider from '@/context/themeContext'

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ThemeContextProvider>
            <html lang="en">
                <body className="h-screen">{children}</body>
            </html>
        </ThemeContextProvider>
    )
}
