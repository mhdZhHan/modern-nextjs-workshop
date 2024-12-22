import { DB } from ".."
import { NewCategory, categoriesTable } from "../schema"

const mockCategories: NewCategory[] = [
  { name: "Node.js" },
  { name: "React" },
  { name: "Next" },
  { name: "Linux" },
  { name: "React Native" },
  { name: "AI" },
  { name: "Data Science" },
]

export async function seed(db: DB) {
  await db.insert(categoriesTable).values(mockCategories)
}
