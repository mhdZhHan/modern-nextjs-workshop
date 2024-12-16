import { wait } from "@/lib/utils"

const page = async () => {
  await wait(2000)

  if (Math.random() > 10) throw new Error("Random error occurred")

  return <div>page</div>
}
export default page
