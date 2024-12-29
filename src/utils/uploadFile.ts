import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants"
import { createClerkSupabaseClient } from "@/lib/supabase/client"
import { toast } from "sonner"

type UploadOptions = {
  file: File
  bucketName: string
  folderName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any
  onSuccess?: (publicUrl: string) => void
  onError?: (error: Error) => void
}

export const uploadFileToStorage = async ({
  file,
  bucketName,
  folderName = "",
  session,
  onSuccess,
  onError,
}: UploadOptions): Promise<void> => {
  if (!file) {
    toast.error("No file selected. Please choose a file to upload.", {
      position: "top-center",
    })
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.error("File size exceeds 9MB. Please upload a smaller file.", {
      position: "top-center",
    })
    return
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    toast.error(
      "Invalid file type. Please upload a JPEG, PNG, or WebP image.",
      {
        position: "top-center",
      }
    )
    return
  }

  const supabase = createClerkSupabaseClient(session)

  const loadingToast = toast.loading("Uploading file...", {
    position: "top-center",
  })

  try {
    const fileName = `${folderName ? `${folderName}/` : ""}${Date.now()}_${file.name}`

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file)

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    if (!urlData?.publicUrl)
      throw new Error("Failed to retrieve the public URL")

    toast.success("File uploaded successfully!", {
      position: "top-center",
    })

    onSuccess?.(urlData.publicUrl)
  } catch (error) {
    console.error("Error uploading file:", error)
    toast.error("Failed to upload file. Please try again.", {
      position: "top-center",
    })

    onError?.(error as Error)
  } finally {
    toast.dismiss(loadingToast)
  }
}
