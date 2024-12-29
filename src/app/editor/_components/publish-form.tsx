import Image from "next/image"
import { X } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useBlogStore } from "@/store/useBlogStore"
import { SHORT_DESCRIPTION_CHAR_LIMIT, TAGS_LIMIT } from "@/lib/constants"

const PublishForm = () => {
  const {
    blogData,
    setEditorState,
    updateBlogData,
    isSubmitting,
    publishPost,
  } = useBlogStore()

  const handleClose = () => {
    setEditorState("editor")
  }

  const handleBlogTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateBlogData({ title: evt.target.value })
  }

  const handleBlogDescription = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateBlogData({ shortDescription: evt.target.value })
  }

  const handleShortDescKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      evt.preventDefault()
    }
  }

  return (
    <section className="mx-auto grid min-h-screen w-full max-w-[80%] items-center py-16 lg:grid-cols-2 lg:gap-4">
      <Button
        className="absolute right-[5vw] top-[5%] z-10 lg:top-[10%]"
        onClick={handleClose}
        variant="ghost"
      >
        <X size={25} />
      </Button>

      <div className="center max-w-[550px]">
        <p className="text-dark-grey mb-1">Preview</p>

        <div className="bg-grey mt-4 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={blogData.banner}
            alt="banner"
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>

        <h1 className="mt-2 line-clamp-2 text-4xl font-medium leading-tight">
          {blogData.title}
        </h1>

        <p className="mt-4 line-clamp-2 text-xl leading-7">
          {blogData.shortDescription}
        </p>
      </div>

      <div className="border-grey lg:border-1 lg:pl-8">
        <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
        <Input
          type="text"
          placeholder="Blog Title"
          value={blogData.title}
          onChange={handleBlogTitle}
        />

        <p className="text-dark-grey mb-2 mt-9">
          Short description about your blog
        </p>
        <Textarea
          maxLength={SHORT_DESCRIPTION_CHAR_LIMIT}
          value={blogData.shortDescription!}
          onChange={handleBlogDescription}
          onKeyDown={handleShortDescKeyDown}
        />

        <p className="text-dark-grey mt-1 text-right text-sm">
          {SHORT_DESCRIPTION_CHAR_LIMIT -
            (blogData.shortDescription?.length || 0)}{" "}
          Characters left
        </p>

        <p className="text-dark-grey mb-2 mt-9">
          Topics - (Helps in searching and ranking your blog post)
        </p>
        <div className="relative py-2 pb-4">
          <Input type="text" placeholder="Topic" />
        </div>
        <p className="text-dark-grey mb-2 mt-1 text-right text-sm">
          {TAGS_LIMIT} Tags left
        </p>

        <Button
          variant="default"
          className="btn-dark px-8"
          onClick={publishPost}
          disabled={isSubmitting || blogData.status === "PUBLISHED"}
        >
          Publish
        </Button>
      </div>
    </section>
  )
}

export default PublishForm
