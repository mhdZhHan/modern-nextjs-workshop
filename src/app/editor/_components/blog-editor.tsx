"use client"

import { useState } from "react"
import EditorNavBar from "./editor-navbar"

import type { JSONContent } from "novel"
import Editor from "@/components/editor/noval-editor"


const BlogEditor = () => {
  const [value, setValue] = useState<JSONContent>()

  const handleTitleKeyDown = (
    evt: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // enter key
    if (evt.keyCode === 13) {
      evt.preventDefault()
    }
  }

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = evt.target
    input.style.height = input.scrollHeight + "px"
  }

  return (
    <>
      <EditorNavBar />

      <div className="z-50 mx-auto w-full max-w-[900px] pb-8 pt-24">
        <div className="border-grey aspect-video border-4 hover:opacity-80">
          <label htmlFor="uploadBanner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/blog-banner-dark.png" alt="blog-banner" />

            <input
              type="file"
              id="uploadBanner"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={() => {}}
            />
          </label>
        </div>

        <textarea
          placeholder="Blog Title"
          defaultValue=""
          className="mt-10 h-20 w-full resize-none bg-inherit text-4xl font-medium leading-tight outline-none placeholder:opacity-40"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
        ></textarea>

        <Editor initialValue={value} onChange={() => setValue} />
      </div>
    </>
  )
}
export default BlogEditor
