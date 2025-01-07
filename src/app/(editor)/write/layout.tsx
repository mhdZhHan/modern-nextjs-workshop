"use client"

import "@/app/styles/prosemirror.css"
import { useEditorStore } from "@/store/useEditorState"

export default function WriteLayout({
  editor,
  publish,
}: {
  publish: React.ReactNode
  editor: React.ReactNode
}) {
  const { editorState } = useEditorStore()
  return <>{editorState === "editor" ? editor : publish}</>
}
