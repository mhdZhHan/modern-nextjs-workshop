/**
 * Comparison Operators:
 *
 * eq() => Checks if a column is equal to a specific value.
 * Example: `where(users.email.eq("example@example.com"))`
 *
 * ne() => Checks if a column is not equal to a specific value.
 * Example: `where(users.name.ne("John Doe"))`
 *
 * lt() => Checks if a column is less than a specific value.
 * Example: `where(users.id.lt(10))`
 *
 * lte() => Checks if a column is less than or equal to a specific value.
 * Example: `where(users.createdAt.lte(new Date("2023-01-01")))`
 *
 * gt() => Checks if a column is greater than a specific value.
 * Example: `where(users.id.gt(5))`
 *
 * gte() => Checks if a column is greater than or equal to a specific value.
 * Example: `where(users.updatedAt.gte(new Date("2023-01-01")))`
 *
 * like() => Performs a pattern matching check (SQL LIKE).
 * Example: `where(users.name.like("%John%"))`
 *
 * ilike() => Performs a case-insensitive pattern matching check (SQL ILIKE).
 * Example: `where(users.email.ilike("%example.com"))`
 *
 * in() => Checks if a column's value is within a specific set of values.
 * Example: `where(users.id.in([1, 2, 3]))`
 *
 * notIn() => Checks if a column's value is not within a specific set of values.
 * Example: `where(users.name.notIn(["John", "Alice"]))`
 *
 * between() => Checks if a column's value is within a range.
 * Example: `where(users.id.between(1, 10))`
 *
 * notBetween() => Checks if a column's value is outside a range.
 * Example: `where(users.createdAt.notBetween(new Date("2023-01-01"), new Date("2023-12-31")))`
 */

export const GET = async () => {
	return Response.json("Hello, WOrld")
}
