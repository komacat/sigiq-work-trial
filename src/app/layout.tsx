import type { Metadata } from 'next'
import './app.css'

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
        <html lang="en">
            <body className="h-screen">{children}</body>
        </html>
    )
}
