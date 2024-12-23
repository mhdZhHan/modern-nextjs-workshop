import Link from "next/link"
import { ThemeToggle } from "../../../components/common/theme-toggle"
import { Button } from "../../../components/ui/button"

const EditorNavBar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-background shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Inkspire
        </Link>
        <span className="text-md">New blog</span>

        <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
          <Button variant={"default"}>Publish</Button>

          <Button variant={"outline"}>Draft</Button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
export default EditorNavBar
