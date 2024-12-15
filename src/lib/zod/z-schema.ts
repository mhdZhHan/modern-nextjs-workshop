import { ZodType, z } from "zod"

export const zResponseSchema = <T>(dataType: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataType.optional(),
  })

// export type ZResponse<T> = z.infer<ReturnType<typeof zResponseSchema<ZodType<T>>>>;

export type ZResponse<T> = {
  success: boolean
  message: string
  data?: T
}
