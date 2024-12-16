"use client"

import { cn } from "@/lib/utils"

type FloatingShapeProps = {
  color: string
  size: string
  top: string
  left: string
  delay?: number
}

function FloatingShape({
  color,
  size,
  top,
  left,
  delay = 0,
}: FloatingShapeProps) {
  return (
    <div
      className={cn(
        "absolute animate-float rounded-full opacity-20 blur-xl",
        color,
        size
      )}
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  )
}

export default FloatingShape
