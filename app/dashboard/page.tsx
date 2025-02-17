"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter from next/navigation

const Dashboard = () => {
  const router = useRouter(); // Initialize the router
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Retrieve name and email from localStorage
    const name = localStorage.getItem("userName")
    const email = localStorage.getItem("userEmail")

    if (name && email) {
      setUserName(name)
      setUserEmail(email)
    } else {
      // Redirect to login if no user data is found
      router.push("/login")
    }
  }, [router])

  return (
    <div className="p-4 bg-gray-200">
      <h1 className="text-5xl font-bold text-center text-[#aa70a7] mb-4">User Profile</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-gray-600">No messages.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">Exciting Offer Coming Soon.</p>
        </div>
      </div>

      {/* Detailed Info Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Username:</span>
            <span className="text-gray-600">{userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{userEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Membership:</span>
            <span className="text-gray-600">Premium</span>
          </div>
        </div>
      </div>

      {/* Cart and Order Details Section */}
      <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart Details</h2>
          <button
            className="bg-[#28b4a4] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#239b8d]"
            onClick={() => router.push("/cart")} // Navigate to /cart
          >
            Go to Cart
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <button
            className="bg-[#28b4a4] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#239b8d]"
            onClick={() => router.push("/success")} // Navigate to /success
          >
            Go to your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
