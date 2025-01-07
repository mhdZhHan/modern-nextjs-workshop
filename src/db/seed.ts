import "server-only"

import { Table, sql } from "drizzle-orm"

import { DB, db } from "."
import * as schema from "./schema"
import * as seeds from "./seeds"

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`)
}

async function main() {
  for (const table of [schema.categoriesTable, schema.tagsTable]) {
    await resetTable(db, table)
  }

  await seeds.category(db)
  await seeds.tag(db)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    console.log("Seeding done!")
    process.exit(0)
  })
