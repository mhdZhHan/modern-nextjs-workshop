import { z } from "zod"
import { HttpStatus } from "./types"

export const zResponseSchema = <T>(dataType: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    status: z.nativeEnum(HttpStatus).optional(),
    zodErrors: z.record(z.string()).optional(),
    data: dataType.optional(),
  })

// export type ZResponse<T> = z.infer<ReturnType<typeof zResponseSchema<ZodType<T>>>>;
