"use client"

import { toast } from "sonner"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import NavLogo from "@/components/common/nav-logo"

import { useEditorStore } from "@/store/useEditorState"

const EditorHeader = () => {
  const { setEditorState, blogData } = useEditorStore()

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
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-4 py-1">
      <NavLogo />

      <span className="text-md">
        {blogData.title ? blogData.title : "New blog"}
      </span>

      <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
        <Button
          variant={"default"}
          size={"sm"}
          onClick={handleChangeEditorState}
        >
          Publish
        </Button>

        <Button variant={"outline"} size={"sm"}>
          Save Draft
        </Button>

        <ThemeToggle />
      </nav>
    </header>
  )
}
export default EditorHeader
