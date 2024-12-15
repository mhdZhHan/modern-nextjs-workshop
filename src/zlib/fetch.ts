export async function zFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
