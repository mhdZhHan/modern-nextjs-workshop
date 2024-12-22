import { DB } from ".."
import { NewTag, tagsTable } from "../schema"

const mockTags: NewTag[] = [
  { name: "web" },
  { name: "ai" },
  { name: "ml" },
  { name: "app" },
  { name: "hello" },
  { name: "linux" },
  { name: "tech" },
  { name: "blog" },
  { name: "info" },
  { name: "guide" },
]

export async function seed(db: DB) {
  await db.insert(tagsTable).values(mockTags)
}
