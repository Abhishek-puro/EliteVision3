// Types for our database
export interface User {
    id: string
    name: string
    email: string
    phoneNumber: string
    orders: Order[]
    feedback: UserFeedback[]
  }
  
  export interface Order {
    id: string
    items: OrderItem[]
    total: number
    date: string
    address: string
    phoneNumber: string
  }
  
  export interface OrderItem {
    name: string
    price: number
    quantity: number
  }
  
  export interface UserFeedback {
    id: string
    productName: string
    rating: number
    comment: string
    date: string
  }
  
  // Database service
  class DatabaseService {
    getAllFeedback() {
        throw new Error("Method not implemented.")
    }
    private users: Record<string, User> = {}
    private currentUser: User | null = null
    private initialized = false
  
    constructor() {
      this.loadFromStorage()
      this.initializeUser() // Add this line to initialize user from localStorage
    }
  
    private loadFromStorage() {
      if (typeof window === "undefined") return
  
      try {
        // Load users database
        const storedUsers = localStorage.getItem("eyewear_users")
        if (storedUsers) {
          this.users = JSON.parse(storedUsers)
        }
  
        // Load current user
        const currentUserId = localStorage.getItem("currentUserId")
        if (currentUserId && this.users[currentUserId]) {
          this.currentUser = this.users[currentUserId]
        }
  
        this.initialized = true
      } catch (error) {
        console.error("Error loading data from storage:", error)
      }
    }
  
    private saveToStorage() {
      if (typeof window === "undefined") return
  
      try {
        localStorage.setItem("eyewear_users", JSON.stringify(this.users))
  
        if (this.currentUser) {
          localStorage.setItem("currentUserId", this.currentUser.id)
        } else {
          localStorage.removeItem("currentUserId")
        }
      } catch (error) {
        console.error("Error saving data to storage:", error)
      }
    }
  
    // User management
    public registerUser(userData: Omit<User, "id" | "orders" | "feedback">): User {
      // Check if user with this email already exists
      const existingUser = Object.values(this.users).find((user) => user.email === userData.email)
  
      if (existingUser) {
        // If user exists, just log them in
        this.currentUser = existingUser
        this.saveToStorage()
        return existingUser
      }
  
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        ...userData,
        orders: [],
        feedback: [],
      }
  
      this.users[newUser.id] = newUser
      this.currentUser = newUser
      this.saveToStorage()
  
      return newUser
    }
  
    public loginUser(email: string): User | null {
      const user = Object.values(this.users).find((user) => user.email === email)
  
      if (user) {
        this.currentUser = user
        this.saveToStorage()
        return user
      }
  
      return null
    }
  
    public logoutUser() {
      this.currentUser = null
      localStorage.removeItem("currentUserId")
      // We don't remove the users database
    }
  
    public getCurrentUser(): User | null {
      return this.currentUser
    }
  
    // Order management
    public addOrder(order: Omit<Order, "id">): Order | null {
      if (!this.currentUser) return null
  
      const newOrder: Order = {
        id: `order_${Date.now()}`,
        ...order,
      }
  
      this.currentUser.orders.push(newOrder)
      this.users[this.currentUser.id] = this.currentUser
      this.saveToStorage()
  
      return newOrder
    }
  
    public getUserOrders(): Order[] {
      return this.currentUser?.orders || []
    }
  
    // Feedback management
    public addFeedback(feedback: Omit<UserFeedback, "id">): UserFeedback | null {
      if (!this.currentUser) return null
  
      const newFeedback: UserFeedback = {
        id: `feedback_${Date.now()}`,
        ...feedback,
      }
  
      this.currentUser.feedback.push(newFeedback)
      this.users[this.currentUser.id] = this.currentUser
      this.saveToStorage()
  
      return newFeedback
    }
  
    public getUserFeedback(): UserFeedback[] {
      return this.currentUser?.feedback || []
    }
  
    public getAllUsersFeedback(): UserFeedback[] {
      return Object.values(this.users).flatMap((user) =>
        user.feedback.map((feedback) => ({
          ...feedback,
          userName: user.name,
        })),
      )
    }
  
    private initializeUser() {
      if (typeof window === "undefined") return
  
      const userInfo = localStorage.getItem("userInfo")
      if (userInfo) {
        try {
          const parsedInfo = JSON.parse(userInfo)
          // Register user from localStorage if exists
          this.registerUser({
            name: parsedInfo.name,
            email: parsedInfo.email,
            phoneNumber: parsedInfo.phoneNumber,
          })
        } catch (error) {
          console.error("Error initializing user:", error)
        }
      }
    }
  }
  
  // Create a singleton instance
  const db = new DatabaseService()
  export default db
  
  