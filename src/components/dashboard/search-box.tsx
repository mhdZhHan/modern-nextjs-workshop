import { Search } from "lucide-react"
import { Input } from "../ui/input"

import { cn } from "@/lib/utils"

type SearchBoxProps = {
  className?: string
}

const SearchBox = ({ className }: SearchBoxProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

      <Input type="search" placeholder="Search" className="w-full pl-8 pr-4" />
    </div>
  )
}
export default SearchBox
