import Link from "next/link"
import {
  type LucideIcon,
  Trash2,
  FileText,
  File,
  Archive,
  BellRing,
  UserPen,
  KeyRound,
  MessageSquare,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

type SidebarItem = {
  icon: LucideIcon
  label: string
  href: string
  count?: number
}

const sidebarItemsPart1: SidebarItem[] = [
  { icon: FileText, label: "Blog Published", href: "/dashboard/posts" },
  { icon: File, label: "Drafts", href: "/dashboard/drafts" },
  { icon: Archive, label: "Archive", href: "/dashboard/archive" },
  { icon: BellRing, label: "Notifications", href: "/dashboard/notifications" },
  { icon: MessageSquare, label: "Comments", href: "/dashboard/comments" },
]

const sidebarItemsPart2: SidebarItem[] = [
  { icon: UserPen, label: "Edit Profile", href: "/dashboard/edit-profile" },
  {
    icon: KeyRound,
    label: "Change Password",
    href: "/dashboard/change-password",
  },
  { icon: Trash2, label: "Trash", href: "/dashboard/trash" },
]

function SidebarItems({ items }: { items: SidebarItem[] }) {
  return (
    <div className="space-y-2 px-3">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <item.icon className="h-4 w-4" />

          <span className="flex-1">{item.label}</span>
          
          {item.count !== undefined && (
            <span className="text-xs">{item.count}</span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background py-4">
      <div className="mb-4">
        <SidebarItems items={sidebarItemsPart1} />
      </div>

      <Separator />

      <div className="mt-4">
        <SidebarItems items={sidebarItemsPart2} />
      </div>
    </div>
  )
}
