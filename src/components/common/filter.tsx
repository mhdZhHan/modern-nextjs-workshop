"use client"

import { useQueryState } from "nuqs"
import { useState } from "react"
import { FilterX } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const CATEGORIES = ["Technology", "Travel", "Food", "Lifestyle", "Fashion"]
const TAGS = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python"]

export default function Filters() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  })

  const [selectedCategories, setSelectedCategories] = useQueryState(
    "categories",
    {
      parse(value) {
        return value ? value.split(",") : []
      },
      serialize(value) {
        return value.join(",")
      },
    }
  )

  const [selectedTags, setSelectedTags] = useQueryState("tags", {
    parse(value) {
      return value ? value.split(",") : []
    },
    serialize(value) {
      return value.join(",")
    },
  })

  const handleCategorySelect = (category: string) => {
    const currentCategories = selectedCategories || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category]

    setSelectedCategories(newCategories)
  }

  const handleTagSelect = (tag: string) => {
    const currentTags = selectedTags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag]

    setSelectedTags(newTags)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedTags([])
  }

  return (
    <div className="rounded-lg border p-4 pb-0">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium uppercase">Filters</span>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear <FilterX className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <div className="my-4">
        <span className="text-sm font-medium uppercase">Search</span>
        <Input
          type="text"
          placeholder="Search..."
          className="mt-2"
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="uppercase hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1 space-y-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={category}
                    checked={(selectedCategories || []).includes(category)}
                    onCheckedChange={() => handleCategorySelect(category)}
                  />
                  <Label htmlFor={category} className="ml-2">
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
            <div className="flex flex-wrap items-center gap-3">
              {TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags?.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date" className="border-none">
          <AccordionTrigger className="uppercase hover:no-underline">
            Date Range
          </AccordionTrigger>
          <AccordionContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full rounded-md border"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
