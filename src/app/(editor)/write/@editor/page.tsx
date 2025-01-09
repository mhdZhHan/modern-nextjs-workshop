"use client"

import { useSession } from "@clerk/nextjs"
import { JSONContent } from "novel"

// components
import { ScrollArea } from "@/components/ui/scroll-area"
import EditorNavbar from "@/components/common/nav/editor-navbar"
import Editor from "@/components/editor/noval-editor"

import { useEditorStore } from "@/store/useEditorState"
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants"
import { uploadFileToStorage } from "@/utils/uploadFile"

const BlogEditor = () => {
  const { session } = useSession()
  const { blogData, updateBlogData, bannerPreview, setBannerPreview } =
    useEditorStore()

  const handleTitleKeyDown = (
    evt: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
    }
  }

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = evt.target

    input.style.height = "auto"
    input.style.height = `${input.scrollHeight}px`

    updateBlogData({ title: input.value })
  }

  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    await uploadFileToStorage({
      file,
      bucketName: "inkspire_assets",
      folderName: "banners",
      session,
      onSuccess: (publicUrl) => {
        setBannerPreview(publicUrl)
        updateBlogData({ banner: publicUrl })
        console.log("Banner uploaded successfully. Public URL:", publicUrl)
      },
      onError: (error) => {
        console.error("Error uploading banner:", error)
      },
    })
  }

  return (
    <>
      <EditorNavbar />

      <ScrollArea className="mt-4 h-[calc(100vh-76.8px)] w-full">
        <div className="z-50 mx-auto w-full max-w-[900px] pb-8">
          <div className="border-grey aspect-video border-4 hover:opacity-80">
            <label htmlFor="uploadBanner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="h-full w-full cursor-pointer object-cover"
              />
              <input
                type="file"
                id="uploadBanner"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            placeholder="Blog Title"
            value={blogData.title}
            className="mt-6 h-16 w-full resize-none bg-inherit text-4xl font-medium leading-tight outline-none placeholder:opacity-40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          />

          <Editor
            initialValue={blogData.content as JSONContent}
            onChange={(newValue) => {
              updateBlogData({ content: newValue })
            }}
          />
        </div>
      </ScrollArea>
    </>
  )
}

export default BlogEditor
