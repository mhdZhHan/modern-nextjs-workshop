"use client"

import "@/app/styles/prosemirror.css"
import { useBlogStore } from "@/store/useBlogStore"

export default function WriteLayout({
  editor,
  publish,
}: {
  publish: React.ReactNode
  editor: React.ReactNode
}) {
  const { editorState } = useBlogStore()
  return <>{editorState === "editor" ? editor : publish}</>
}
