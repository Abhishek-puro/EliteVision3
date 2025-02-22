"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Banner } from "@/components/banner";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { Pagination } from "@/components/pagination";
import { BrandFilter } from "@/components/brand-filter";
import { products } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, selectedBrands]);

  const totalPages = Math.ceil(filteredProducts.length / 15);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleBrandChange = (brands: string[]) => {
    setSelectedBrands(brands);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: { name: string; price: number }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );

      if (!prevCart.some((item) => item.name === product.name)) {
        updatedCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (product: { name: string }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Banner />
      <Header
        selectedBrand={selectedBrands[0] || ""}
        onBrandChange={(brand) => handleBrandChange(brand ? [brand] : [])}
        isOpen={isSideMenuOpen}
        setIsOpen={setIsSideMenuOpen}
      />
      <Hero />
      <main className="container mx-auto px-4 lg:px-[90px] py-8 md:py-12" id="products">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold">
              <span className="text-[#aa70a7]">Virtual Try-On</span> <span className="text-black">Products</span>
            </h1>
            <Button
              className="bg-[#28b4a4] hover:bg-[#28b4a4]/90 text-white"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({totalItems}) - ₹{totalPrice.toLocaleString()}
            </Button>
          </div>
          <ProductGrid
            currentPage={currentPage}
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart} // ✅ Pass the function here
            hoveredProduct={hoveredProduct}
            setHoveredProduct={setHoveredProduct}
          />
        </div>
      </main>
    </div>
  );
}
