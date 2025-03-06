import { Card, CardContent } from "@/components/ui/card"
import type { FeedbackItem } from "@/data/feedback"
import { Star } from "lucide-react"

interface FeedbackCardProps {
  feedback: FeedbackItem
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{feedback.userName}</h3>
            <p className="text-sm text-gray-500">{feedback.date}</p>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-gray-700">{feedback.comment}</p>
        <p className="mt-2 text-sm text-gray-500">Product: {feedback.productName}</p>
      </CardContent>
    </Card>
  )
}

