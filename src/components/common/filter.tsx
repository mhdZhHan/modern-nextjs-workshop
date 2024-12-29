"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const categories = ["Technology", "Travel", "Food", "Lifestyle", "Fashion"]
const tags = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python"]

export default function Filters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="border p-4">
      <div>
        <h2 className="mb-2 text-lg font-semibold">Search</h2>
        <Input type="text" placeholder="Search blogs..." />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="uppercase hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger className="uppercase hover:no-underline">
            Tags
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 space-y-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="ml-2">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date">
          <AccordionTrigger className="uppercase hover:no-underline">
            Date Range
          </AccordionTrigger>
          <AccordionContent>
            <Calendar
              mode="range"
              selected={dateRange}
              // onSelect={setDateRange}
              className="w-full rounded-md border"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
