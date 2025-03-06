"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Banner } from "@/components/banner"
import { Header } from "@/components/header"
import { ProductFeedbackCard } from "@/components/product-feedback-card"
import { products } from "@/data/products"
import { type FeedbackItem, generateFeedbackForProduct, getFeedbackData, setFeedbackData } from "@/data/feedback"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"



export default function FeedbackProductsPage() {
  const [feedback, setFeedback] = useState<Record<string, FeedbackItem[]>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("userInfo")
   

    // Get cart count
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const cart = JSON.parse(storedCart)
      setCartItemsCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
    }

    // Initialize feedback data if empty
    let storedFeedbackData = getFeedbackData()
    if (storedFeedbackData.length === 0) {
      const allFeedback: FeedbackItem[] = []
      products.forEach((product) => {
        allFeedback.push(...generateFeedbackForProduct(product.name))
      })
      setFeedbackData(allFeedback)
      storedFeedbackData = allFeedback
    }

    // Get stored feedback from localStorage
    const storedFeedback = localStorage.getItem("userFeedback")
    const userFeedback: FeedbackItem[] = storedFeedback ? JSON.parse(storedFeedback) : []

    // Organize feedback by product
    const feedbackByProduct: Record<string, FeedbackItem[]> = {}

    // Add pre-generated feedback
    storedFeedbackData.forEach((item) => {
      if (!feedbackByProduct[item.productName]) {
        feedbackByProduct[item.productName] = []
      }
      feedbackByProduct[item.productName].push(item)
    })

    // Add user feedback
    userFeedback.forEach((item) => {
      if (!feedbackByProduct[item.productName]) {
        feedbackByProduct[item.productName] = []
      }
      feedbackByProduct[item.productName].push(item)
    })

    setFeedback(feedbackByProduct)
  }, [router])

  // Filter products based on search query
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Banner />
 
      
  

      <main className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="text-[#aa70a7]">Product</span> <span className="text-black">Feedback</span>
        </h1>

        <div className="relative mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductFeedbackCard
              key={product.name}
              name={product.name}
              imageUrl={product.imageUrl}
              feedback={feedback[product.name] || []}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

