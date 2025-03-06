"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export function FeedbackButton() {
  const router = useRouter()

  return (
    <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/feedback")}>
      <MessageSquare className="h-4 w-4" />
      <span>Feedback</span>
    </Button>
  )
}

