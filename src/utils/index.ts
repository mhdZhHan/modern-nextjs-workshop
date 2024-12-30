export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export const simplifyDate = (date: Date) => {
  const dateObj = new Date(date)

  const simplifiedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const simplifiedTime = dateObj.toLocaleTimeString("en-US", {
    timeStyle: "short",
  })

  return { simplifiedDate, simplifiedTime }
}
