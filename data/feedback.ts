export interface FeedbackItem {
    id: string
    productName: string
    userName: string
    rating: number
    comment: string
    date: string
  }
  
  // Generate 10 positive reviews for each product
  export const generateFeedbackForProduct = (productName: string): FeedbackItem[] => {
    const positiveComments = [
      "These glasses are amazing! The fit is perfect and they look great on me.",
      "I've received so many compliments on these frames. Absolutely love them!",
      "The quality is outstanding. Worth every penny!",
      "These are the most comfortable glasses I've ever worn. Highly recommend!",
      "The virtual try-on feature helped me pick these, and they're even better in person!",
      "Perfect style and excellent quality. Very satisfied with my purchase.",
      "These frames are lightweight yet durable. Exactly what I was looking for!",
      "The color is stunning and matches everything in my wardrobe.",
      "I've been wearing these for a month now and they still look brand new. Great quality!",
      "The design is so unique and stylish. I feel confident wearing these glasses.",
      "These frames are versatile and go with any outfit. Love the design!",
      "The clarity of the lenses is exceptional. Very happy with my purchase.",
      "I was hesitant to buy glasses online, but these exceeded my expectations!",
      "The frames are sturdy and well-made. Definitely worth the investment.",
      "These glasses have transformed my look completely. So happy with them!",
    ]
  
    const names = [
      "John Smith",
      "Emma Johnson",
      "Michael Brown",
      "Sophia Davis",
      "William Wilson",
      "Olivia Martinez",
      "James Taylor",
      "Ava Anderson",
      "Robert Thomas",
      "Isabella Jackson",
      "David White",
      "Mia Harris",
      "Joseph Martin",
      "Charlotte Thompson",
      "Charles Garcia",
    ]
  
    return Array.from({ length: 10 }, (_, i) => {
      const randomDays = Math.floor(Math.random() * 60) + 1 // Random day in the last 60 days
      const date = new Date()
      date.setDate(date.getDate() - randomDays)
  
      return {
        id: `${productName.replace(/\s+/g, "-").toLowerCase()}-review-${i + 1}`,
        productName,
        userName: names[Math.floor(Math.random() * names.length)],
        rating: Math.floor(Math.random() * 2) + 4, // Ratings between 4-5 (positive)
        comment: positiveComments[Math.floor(Math.random() * positiveComments.length)],
        date: date.toISOString().split("T")[0],
      }
    })
  }
  
  // Instead of exporting a variable, export a function to get feedback data
  let _feedbackData: FeedbackItem[] = []
  
  export const getFeedbackData = () => {
    return _feedbackData
  }
  
  export const setFeedbackData = (data: FeedbackItem[]) => {
    _feedbackData = data
  }
  
  