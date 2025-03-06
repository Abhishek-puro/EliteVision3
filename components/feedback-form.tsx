"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { products } from "@/data/products";
import { Star } from "lucide-react";
import db from "@/services/database";

interface Feedback {
  productName: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export function FeedbackForm() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    try {
      // Get user info from the database
      const currentUser = db.getCurrentUser();
      if (currentUser) {
        setUserName(currentUser.name);
      } else {
        // Fallback: Try getting it from localStorage
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }
      }

      // Load existing feedback from database
      const storedFeedback = db.getAllFeedback() || [];
      setFeedbackList(storedFeedback);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !comment) {
      alert("Please select a product and provide feedback.");
      return;
    }

    const newFeedback: Feedback = {
      productName: selectedProduct,
      rating,
      comment,
      userName,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      db.addFeedback(newFeedback);
      console.log("Feedback submitted:", newFeedback);

      // Update the feedback list
      setFeedbackList((prevFeedback) => [newFeedback, ...prevFeedback]);

      // Reset form
      setSelectedProduct("");
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="product">Select Product</Label>
          <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
            <SelectTrigger id="product">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.name} value={product.name}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="name">Your Name</Label>
          <input
            id="name"
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            value={userName}
            disabled
          />
        </div>

        <div>
          <Label>Rating</Label>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="comment">Your Feedback</Label>
          <Textarea
            id="comment"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] border p-2 rounded-md"
            required
          />
        </div>

        <Button type="submit" className="w-full bg-[#aa70a7] hover:bg-[#aa70a7]/90">
          Submit Feedback
        </Button>
      </form>

      {/* View Feedback Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Customer Feedback</h2>
        {feedbackList.length > 0 ? (
          <div className="space-y-4 mt-4">
            {feedbackList.map((feedback, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-sm text-gray-600">{feedback.date}</p>
                <h3 className="font-semibold">{feedback.productName}</h3>
                <p className="text-gray-700">By: {feedback.userName}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        feedback.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-800 mt-2">{feedback.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
}
