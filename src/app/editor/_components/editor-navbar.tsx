import Link from "next/link"
import { ThemeToggle } from "../../../components/common/theme-toggle"
import { Button } from "../../../components/ui/button"
import { useBlogStore } from "@/store/useBlogStore"
import { toast } from "sonner"

const EditorNavBar = () => {
  const { setEditorState, blogData } = useBlogStore()

  const handleChangeEditorState = () => {
    if (!blogData.banner) {
      return toast.error("Upload a blog banner to publish it")
    }

    if (!blogData.title) {
      return toast.error("Write blog title to publish it")
    }

    if (!blogData.content || Object.keys(blogData.content).length === 0) {
      return toast.error("Write something in your blog to publish it")
    }

    setEditorState("publish")
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-10 border-b bg-background shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6 py-2">
        <Link href="/blog" className="text-2xl">
          Inkspire
        </Link>
        <span className="text-md">
          {blogData.title ? blogData.title : "New blog"}
        </span>

        <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
          <Button variant={"default"} onClick={handleChangeEditorState}>
            Publish
          </Button>

          <Button variant={"outline"}>Save Draft</Button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
export default EditorNavBar
