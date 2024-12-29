"use client"

import Image from "next/image"
import { useSession } from "@clerk/nextjs"

// components
import EditorNavBar from "./editor-navbar"
import Editor from "@/components/editor/noval-editor"
import PublishForm from "./publish-form"

import { uploadFileToStorage } from "@/utils/uploadFile"
import { useBlogStore } from "@/store/useBlogStore"
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants"
import { JSONContent } from "novel"

const BlogEditor = () => {
  const { session } = useSession()
  const {
    blogData,
    updateBlogData,
    editorState,
    bannerPreview,
    setBannerPreview,
  } = useBlogStore()

  const handleTitleKeyDown = (
    evt: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
    }
  }

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = evt.target

    // adjust the textarea height
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
      {editorState === "editor" ? (
        <>
          <EditorNavBar />

          <div className="z-50 mx-auto w-full max-w-[900px] pb-8 pt-24">
            <div className="border-grey aspect-video border-4 hover:opacity-80">
              <label htmlFor="uploadBanner">
                <Image
                  src={bannerPreview}
                  quality={100}
                  objectFit="cover"
                  priority
                  alt="Banner preview"
                  width={400}
                  height={200}
                  className="h-full w-full cursor-pointer"
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
        </>
      ) : (
        <PublishForm />
      )}
    </>
  )
}

export default BlogEditor
