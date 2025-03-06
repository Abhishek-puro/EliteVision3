"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Banner } from "@/components/banner"
import { Header } from "@/components/header"
import { FeedbackCard } from "@/components/feedback-card"
import { FeedbackForm } from "@/components/feedback-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { type FeedbackItem, generateFeedbackForProduct, getFeedbackData, setFeedbackData } from "@/data/feedback"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Link from "next/link"
import db from "@/services/database"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    

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

    // Get user feedback from database
    const userFeedback = db.getAllUsersFeedback()

    // Combine pre-generated feedback with user feedback
    setFeedback([...storedFeedbackData, ...userFeedback])
    setFilteredFeedback([...storedFeedbackData, ...userFeedback])
  }, [router])

  useEffect(() => {
    if (selectedProduct !== "all") {
      setFilteredFeedback(feedback.filter((item) => item.productName === selectedProduct))
    } else {
      setFilteredFeedback(feedback)
    }
  }, [selectedProduct, feedback])

  const handleSubmitFeedback = (newFeedback: { productName: string; rating: number; comment: string }) => {
    toast.success("Thank you for your feedback!", {
      position: "top-right",
      autoClose: 3000,
    })

    // Refresh feedback list
    const currentUser = db.getCurrentUser()
    if (currentUser) {
      const userName = currentUser.name

      // Add to local state for immediate display
      const feedbackItem: FeedbackItem = {
        ...newFeedback,
        id: `user-feedback-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        userName,
      }

      setFeedback((prev) => [...prev, feedbackItem])
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Banner />
      <Header
        selectedBrand=""
        onBrandChange={() => {}}
        isOpen={isSideMenuOpen}
        setIsOpen={setIsSideMenuOpen}
        cartItemsCount={cartItemsCount}
      />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#aa70a7]">Customer</span> <span className="text-black">Feedback</span>
          </h1>
          <Link href="/feedback/products">
            <Button className="bg-[#28b4a4] hover:bg-[#28b4a4]/90 text-white">Browse Products Feedback</Button>
          </Link>
        </div>

        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="view">View Feedback</TabsTrigger>
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4">
            <div className="mb-6">
              <Label htmlFor="filter-product">Filter by Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger id="filter-product">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.name} value={product.name}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFeedback.map((item) => (
                <FeedbackCard key={item.id} feedback={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <FeedbackForm onSubmit={handleSubmitFeedback} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <ToastContainer />
    </div>
  )
}

