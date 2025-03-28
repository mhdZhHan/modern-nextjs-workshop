import { create } from "zustand"
import { toast } from "sonner"
import { createNewPost, updatePost } from "@/actions/post-actions"

import { z } from "zod"
import { slugify } from "@/utils"
import { JSONContent } from "novel"

const marksSchema = z.object({
  type: z.string(),
  attrs: z.record(z.any()).optional(),
})

const jsonContentSchema: z.ZodSchema<JSONContent> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    attrs: z.record(z.any()).optional(),
    content: z.array(z.lazy(() => jsonContentSchema)).optional(),
    marks: z.array(marksSchema).optional(),
    text: z.string().optional(),
  })
)

export const newPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  banner: z.string().url("Banner must be a valid URL"),
  content: jsonContentSchema.refine(
    (content) => !!content?.type || !!content?.text,
    "Content must include a valid type or text property"
  ),
  shortDescription: z.string().min(1, "Short description is required"),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
  tags: z.array(z.string()),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
})

export type NewPost = z.infer<typeof newPostSchema>

type EditorStore = {
  editorState: "editor" | "publish"
  isSubmitting: boolean
  isDirty: boolean
  blogData: NewPost
  bannerPreview: string

  // Actions
  setEditorState: (state: "editor" | "publish") => void
  setBannerPreview: (url: string) => void
  updateBlogData: (data: Partial<NewPost>) => void
  resetBlogData: () => void

  // Form Submission
  publishPost: () => Promise<boolean>
  saveDraft: () => Promise<void>
}

export const useEditorStore = create<EditorStore>()((set, get) => ({
  editorState: "editor",
  isSubmitting: false,
  isDirty: false,
  blogData: newPostSchema.safeParse({}).success
    ? newPostSchema.parse({})
    : {
        title: "",
        slug: "",
        shortDescription: "",
        banner: "",
        content: {},
        tags: [],
        categoryId: "15301e77-42ed-4a32-904c-039739f71819",
        status: "DRAFT",
      },
  bannerPreview: "/blog-banner-dark.png",

  setEditorState: (state) => set({ editorState: state }),
  setBannerPreview: (url) => set({ bannerPreview: url }),

  updateBlogData: (data) => {
    set((state) => {
      const updatedData = { ...state.blogData, ...data }

      if (
        data.title &&
        (!updatedData.slug || updatedData.title !== state.blogData.title)
      ) {
        updatedData.slug = slugify(updatedData.title)
      }

      return {
        blogData: updatedData,
        isDirty: true,
      }
    })
  },

  resetBlogData: () => {
    set({
      blogData: newPostSchema.parse({}),
      bannerPreview: "/blog-banner-dark.png",
      isDirty: false,
      editorState: "editor",
    })
  },

  // Form Submission
  publishPost: async () => {
    const { blogData } = get()
    const validatedData = newPostSchema.safeParse(blogData)

    if (!validatedData.success) {
      const errorMessage = validatedData.error.issues.map(
        (issue) => issue.message
      )
      toast.error(errorMessage)
      return false
    }

    set({ isSubmitting: true })

    try {
      const result = await createNewPost({
        ...blogData,
        status: "PUBLISHED",
        content: JSON.stringify(blogData.content),
      })

      if (result.success) {
        toast.success("Blog post published successfully")
        set({ isDirty: false })
        return true
      }

      toast.error(result.message)
      return false
    } catch (error) {
      console.error("Error publishing post:", error)
      toast.error("Failed to publish post")
      return false
    } finally {
      set({ isSubmitting: false })
    }
  },

  editBlogPost: async () => {
    const { blogData } = get()

    set({ isSubmitting: true })

    try {
      await updatePost({
        ...blogData,
        status: "ARCHIVED",
      })
      toast.success("Post archived successfully")
      set({ isDirty: false })
    } catch (error) {
      console.error("Error archiving post:", error)
      toast.error("Failed to archive post")
    } finally {
      set({ isSubmitting: false })
    }
  },

  saveDraft: async () => {
    const { blogData } = get()
    set({ isSubmitting: true })

    try {
      await createNewPost({
        ...blogData,
        status: "DRAFT",
      })
      toast.success("Draft saved successfully")
      set({ isDirty: false })
    } catch (error) {
      console.error("Error saving draft:", error)
      toast.error("Failed to save draft")
    } finally {
      set({ isSubmitting: false })
    }
  },
}))
