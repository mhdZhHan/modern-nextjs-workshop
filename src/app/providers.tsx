import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/providers/theme-provider"
import { ClientProvider } from "@/providers/client-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
// import { Wrapper } from "@/components/wrapper"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientProvider>
          {/* <Wrapper>{children}</Wrapper> */}

          {children}

          <Toaster />
          <SonnerToaster />
        </ClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}
