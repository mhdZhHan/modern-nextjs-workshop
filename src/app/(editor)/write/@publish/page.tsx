"use client"

import { useRouter } from "next/navigation"
import { Loader, X } from "lucide-react"
import { toast } from "sonner"

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { useEditorStore } from "@/store/useEditorState"
import { SHORT_DESCRIPTION_CHAR_LIMIT, TAGS_LIMIT } from "@/lib/constants"

const PublishForm = () => {
  const router = useRouter()

  const {
    blogData,
    setEditorState,
    updateBlogData,
    isSubmitting,
    publishPost,
  } = useEditorStore()

  const handleClose = () => {
    setEditorState("editor")
  }

  const updatePostTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateBlogData({ title: evt.target.value })
  }

  const updatePostShortDescription = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateBlogData({ shortDescription: evt.target.value })
  }

  const handleShortDescKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
    }
  }

  const handleTagsInputKeyDown = (
    evt: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (evt.key === "Enter" || evt.key === ",") {
      evt.preventDefault()

      const tag = evt.currentTarget.value.trim().toLowerCase()

      if (tag.length === 0) return

      if (blogData.tags.length < TAGS_LIMIT) {
        if (!blogData.tags.includes(tag)) {
          updateBlogData({
            tags: [...blogData.tags, tag],
          })
        }
      } else {
        toast.error(`You can add max ${TAGS_LIMIT} tags`)
      }

      evt.currentTarget.value = ""
    }
  }

  const handlePublish = async () => {
    const success = await publishPost()
    
    if (success) {
      setTimeout(() => {
        router.push("/dashboard/posts")
      }, 500)
    }
  }

  return (
    <div className="m-auto grid w-full max-w-[80%] lg:grid-cols-2 lg:gap-4">
      <Button
        className="absolute right-[8vw] top-[3%] z-10 lg:top-[10%]"
        onClick={handleClose}
        variant="ghost"
      >
        <X size={25} />
      </Button>

      <div className="h-full max-w-[550px]">
        <p className="text-dark-grey mb-4">Preview</p>

        <div className="bg-grey aspect-video w-full overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogData.banner || "/placeholder.jpg"}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-2 line-clamp-2 text-4xl font-medium leading-tight">
          {blogData.title}
        </h1>

        <p className="mt-4 line-clamp-2 text-xl leading-7">
          {blogData.shortDescription}
        </p>
      </div>

      <div className="border-grey lg:border-1 h-full lg:pl-8">
        <p className="text-dark-grey mb-2">Blog Title</p>
        <Input
          type="text"
          placeholder="Blog Title"
          value={blogData.title}
          onChange={updatePostTitle}
        />

        <p className="text-dark-grey mb-2 mt-6">
          Short description about your blog
        </p>
        <Textarea
          maxLength={SHORT_DESCRIPTION_CHAR_LIMIT}
          value={blogData.shortDescription!}
          onChange={updatePostShortDescription}
          onKeyDown={handleShortDescKeyDown}
        />
        <p className="text-dark-grey mt-4 text-right text-sm">
          {SHORT_DESCRIPTION_CHAR_LIMIT -
            (blogData.shortDescription?.length || 0)}{" "}
          Characters left
        </p>

        <p className="text-dark-grey mb-2 mt-6">
          Topics - (Helps in searching and ranking your blog post)
        </p>
        <div className="relative">
          <Input
            type="text"
            placeholder="Topic"
            onKeyDown={handleTagsInputKeyDown}
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {blogData.tags.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant={"secondary"}
                className="rounded-lg py-1 text-xs font-semibold"
              >
                {tag}
                <button
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-gray-700"
                  onClick={() => {}}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-dark-grey mt-4 text-right text-sm">
          {TAGS_LIMIT - blogData.tags.length} Tags left
        </p>

        <Button
          variant="default"
          className="btn-dark px-8"
          onClick={handlePublish}
          disabled={isSubmitting || blogData.status === "PUBLISHED"}
        >
          {isSubmitting && <Loader className="size-4 animate-spin" />} Publish
        </Button>
      </div>
    </div>
  )
}

export default PublishForm
