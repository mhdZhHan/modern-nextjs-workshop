export default async function BlogsTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="relative h-full w-full bg-neutral-900">
        <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      </div>

      {children}
    </>
  )
}
