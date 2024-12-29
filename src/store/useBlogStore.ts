import { create } from "zustand"
import { toast } from "sonner"
import {
  createNewPost,
  deletePostById,
  updatePost,
} from "@/actions/post-actions"
import { NewPost } from "@/db/schema"

type BlogStore = {
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
  publishPost: () => Promise<void>
  saveDraft: () => Promise<void>
  deleteBlog: (id: string) => Promise<void>

  // Validation
  validateBlogData: () => boolean
}

const initialBlogData: NewPost = {
  title: "",
  slug: "",
  banner: "",
  content: "",
  shortDescription: "",
  authorId: "",
  categoryId: "21bf8172-0de9-4f68-b8cd-dd9f5d56d658",
  status: "DRAFT",
}

export const useBlogStore = create<BlogStore>()((set, get) => ({
  editorState: "editor",
  isSubmitting: false,
  isDirty: false,
  blogData: initialBlogData,
  bannerPreview: "/blog-banner-dark.png",

  setEditorState: (state) => set({ editorState: state }),
  setBannerPreview: (url) => set({ bannerPreview: url }),

  updateBlogData: (data) => {
    set((state) => ({
      blogData: { ...state.blogData, ...data },
      isDirty: true,
    }))
  },

  resetBlogData: () => {
    set({
      blogData: initialBlogData,
      bannerPreview: "/blog-banner-dark.png",
      isDirty: false,
      editorState: "editor",
    })
  },

  // Validation
  validateBlogData: () => {
    const { blogData } = get()

    if (!blogData.banner) {
      toast.error("Please upload a banner image")
      return false
    }

    if (!blogData.title.trim()) {
      toast.error("Please add a blog title")
      return false
    }

    if (!blogData.content) {
      toast.error("Please add some content to your blog")
      return false
    }

    if (!blogData.shortDescription?.trim()) {
      toast.error("Please add a short description")
      return false
    }

    if (!blogData.categoryId) {
      toast.error("Please select a category")
      return false
    }

    return true
  },

  // Form Submission
  publishPost: async () => {
    const { blogData, validateBlogData } = get()

    if (!validateBlogData()) return

    set({ isSubmitting: true })

    try {
      await createNewPost({
        ...blogData,
        status: "PUBLISHED",
      })
      toast.success("Blog post published successfully")
      set({ isDirty: false })
    } catch (error) {
      console.error("Error publishing post:", error)
      toast.error("Failed to publish post")
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

  archivePost: async () => {
    const { blogData } = get()

    if (!blogData.id) {
      toast.error("Cannot archive an unsaved post")
      return
    }

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

  deleteBlog: async (id: string) => {
    set({ isSubmitting: true })

    try {
      await deletePostById(id)
      toast.success("Blog post deleted successfully")
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Failed to delete blog post")
    } finally {
      set({ isSubmitting: false })
    }
  },
}))
