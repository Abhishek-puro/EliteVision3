// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Banner } from "@/components/banner"
// import { Header } from "@/components/header"
// import { CategoryCard } from "@/components/category-card"
// import db from "@/services/database"

// const categories = {
//   eyeglasses: {
//     title: "Eyeglasses",
//     subtitle: "with Power",
//     sections: [
//       {
//         name: "Men",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166879/image_168_deayxg.png",
//         link: "/categories/eyeglasses/men",
//       },
//       {
//         name: "Women",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166879/image_169_or2dyq.png",
//         link: "/categories/eyeglasses/women",
//       },
//       {
//         name: "Kids",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166880/image_170_dntgz1.png",
//         link: "/categories/eyeglasses/kids",
//       },
//       {
//         name: "Essentials",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166881/image_171_fgiahg.png",
//         link: "/categories/eyeglasses/essentials",
//         badge: "60% OFF",
//       },
//     ],
//   },
//   sunglasses: {
//     title: "Sunglasses",
//     sections: [
//       {
//         name: "Men",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166882/image_172_clcgwg.png",
//         link: "/categories/sunglasses/men",
//       },
//       {
//         name: "Women",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166285/image_173_gpzwib.png",
//         link: "/categories/sunglasses/women",
//       },
//       {
//         name: "Kids",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166285/image_174_sej7ai.png",
//         link: "/categories/sunglasses/kids",
//       },
//       {
//         name: "Essentials",
//         image: "https://res.cloudinary.com/drnavq85s/image/upload/v1736166288/model-snapshot_3_1_qtv7bn.png",
//         link: "/categories/sunglasses/essentials",
//         badge: "60% OFF",
//       },
//     ],
//   },
//   specialPowers: {
//     title: "Special Powers",
//     sections: [
//       { name: "Zero Power", image: "/placeholder.svg?height=200&width=200", link: "/categories/powers/zero" },
//       { name: "Progressive", image: "/placeholder.svg?height=200&width=200", link: "/categories/powers/progressive" },
//       { name: "Reading", image: "/placeholder.svg?height=200&width=200", link: "/categories/powers/reading" },
//       {
//         name: "Power Sun",
//         image: "/placeholder.svg?height=200&width=200",
//         link: "/categories/powers/sun",
//         badge: "Exclusive",
//       },
//     ],
//   },
//   accessories: {
//     title: "Contact Lenses & Accessories",
//     sections: [
//       { name: "Clear", image: "/placeholder.svg?height=200&width=200", link: "/categories/accessories/clear" },
//       { name: "Color", image: "/placeholder.svg?height=200&width=200", link: "/categories/accessories/color" },
//       {
//         name: "Solution & Accessories",
//         image: "/placeholder.svg?height=200&width=200",
//         link: "/categories/accessories/solutions",
//       },
//       { name: "Cases & Chains", image: "/placeholder.svg?height=200&width=200", link: "/categories/accessories/cases" },
//     ],
//   },
// }

// export default function CategoriesPage() {
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
//   const [cartItemsCount, setCartItemsCount] = useState(0)
//   const router = useRouter()

//   useEffect(() => {
//     // Check if user is logged in
//     const currentUser = db.getCurrentUser()
//     if (!currentUser) {
//       router.push("/login")
//       return
//     }

//     // Get cart count
//     const storedCart = localStorage.getItem("cart")
//     if (storedCart) {
//       const cart = JSON.parse(storedCart)
//       setCartItemsCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
//     }
//   }, [router])

//   return (
//     <div className="min-h-screen bg-[#f8f8f6]">
//       <Banner />
//       <Header
//         selectedBrand=""
//         onBrandChange={() => {}}
//         isOpen={isSideMenuOpen}
//         setIsOpen={setIsSideMenuOpen}
//         cartItemsCount={cartItemsCount}
//       />

//       <main className="container mx-auto px-4 py-8 md:py-12">
//         <div className="max-w-[1440px] mx-auto">
//           {Object.entries(categories).map(([key, category]) => (
//             <div key={key} className="mb-12">
//               <div className="flex items-baseline gap-2 mb-6">
//                 <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
//                 {category.subtitle && <span className="text-sm md:text-base text-gray-600">{category.subtitle}</span>}
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//                 {category.sections.map((section) => (
//                   <CategoryCard
//                     key={section.name}
//                     name={section.name}
//                     image={section.image}
//                     link={section.link}
//                     badge={section.badge}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }

