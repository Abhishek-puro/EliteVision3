"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { FeedbackItem } from "@/data/feedback"
import { Star, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FeedbackCard } from "./feedback-card"

interface ProductFeedbackCardProps {
  name: string
  imageUrl: string
  feedback: FeedbackItem[]
}

export function ProductFeedbackCard({ name, imageUrl, feedback }: ProductFeedbackCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Calculate average rating
  const averageRating = feedback.length > 0 ? feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="aspect-square relative mb-4 bg-[#F8F8F6] rounded-lg">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-contain" />
      </div>
      <h3 className="font-medium text-center mb-3 min-h-[48px] line-clamp-2 text-[#515151]">{name}</h3>

      <div className="flex justify-between items-center mb-3">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{feedback.length} reviews</span>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            View Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{name} - Customer Feedback</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {feedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

