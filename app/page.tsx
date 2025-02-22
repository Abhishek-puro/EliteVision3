"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => router.push("/products"), 1500);
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRegistering && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
  };
  if (isLoggedIn) {
    return (
      <motion.div
          initial={{ translateY: 0 }}
          animate={{ translateY: "-100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#B2B5E0] z-50 flex items-center justify-center"
        >
          <h1 className="text-3xl font-bold text-center">Welcome <br /> to <br /> Elite Vision</h1>
        </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B2B5E0] relative overflow-hidden">
      <Card className="w-full max-w-md border-black border-2 relative z-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {isRegistering ? "Register" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegistering && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <CardFooter className="flex flex-col gap-3 mt-6">
              <Button type="submit" className="w-full bg-[#aa70a7] hover:bg-[#aa70a7]/90">
                {isRegistering ? "Register" : "Login"}
              </Button>
              <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}