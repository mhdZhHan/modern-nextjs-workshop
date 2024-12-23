"use client"

import { useState } from "react"
import EditorNavBar from "./editor-navbar"
import { useSession } from "@clerk/nextjs"

import type { JSONContent } from "novel"
import Editor from "@/components/editor/noval-editor"
import PublishForm from "./publish-form"
import { NewPost } from "@/db/schema"
import { toast } from "@/hooks/use-toast"

// Constants
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/constants"

// lib
import { createClerkSupabaseClient } from "@/lib/supabase/client"

const BlogEditor = () => {
  const [editorState, seEditorState] = useState<"editor" | "publish">("editor")
  const [blogContent, setBlogContent] = useState<JSONContent>()
  const [blogData, setBlogData] = useState<NewPost>({
    title: "",
    authorId: "",
    banner: "",
    categoryId: "",
    content: "",
    slug: "",
    tagIds: [],
  })
  const [bannerPreview, setBannerPreview] = useState<string>(
    "/blog-banner-dark.png"
  )

  const { session } = useSession()

  // ANCHOR: Title Events
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
    input.style.height = input.scrollHeight + "px"

    setBlogData((prev) => ({
      ...prev,
      title: input.value,
    }))
  }

  // ANCHOR: Banner Upload
  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const supabase = createClerkSupabaseClient(session)

    try {
      const fileName = `banners/${Date.now()}_${file.name}`
      const { data, error } = await supabase.storage
        .from("inkspire_assets")
        .upload(fileName, file)

      if (error) {
        throw error
      }
      console.log("File uploaded successfully:", data)

      const {
        data: { publicUrl },
      } = supabase.storage.from("inkspire_assets").getPublicUrl(fileName)
      console.log("Public URL:", publicUrl)
    } catch (error) {
      console.error("Error uploading banner:", error)
    }
  }

  // ANCHOR: Verify publish
  const verifyBlogPublish = () => {
    if (!blogData.banner.length) {
      return toast({
        title: "Upload a blog banner to publish it",
      })
    }

    if (!blogData.title.length) {
      return toast({
        title: "Write blog title to publish it",
      })
    }
    seEditorState("publish")
  }

  return (
    <>
      {editorState ? (
        <>
          <EditorNavBar handleBlogPublish={verifyBlogPublish} />

          <div className="z-50 mx-auto w-full max-w-[900px] pb-8 pt-24">
            <div className="border-grey aspect-video border-4 hover:opacity-80">
              <label htmlFor="uploadBanner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bannerPreview} alt="blog-banner" />
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
              className="mt-10 h-20 w-full resize-none bg-inherit text-4xl font-medium leading-tight outline-none placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <Editor
              initialValue={blogContent}
              onChange={(newValue) => {
                setBlogContent(newValue)
                setBlogData((prev) => ({
                  ...prev,
                  content: newValue,
                }))
              }}
            />
          </div>
        </>
      ) : (
        <PublishForm
          seEditorState={seEditorState}
          blogData={blogData}
          setBlogData={setBlogData}
        />
      )}
    </>
  )
}

export default BlogEditor
