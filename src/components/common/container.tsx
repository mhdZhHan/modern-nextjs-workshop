export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-l border-r bg-background">
      {children}
    </div>
  )
}
