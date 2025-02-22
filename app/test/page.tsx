"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type TestCase = { text: string; size: string; color: string };

const generateRandomString = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function EyeTest() {
  const router = useRouter();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTestCases([
      { text: generateRandomString(), size: "text-8xl", color: "text-gray-800" },
      { text: generateRandomString(), size: "text-6xl", color: "text-yellow-600" },
      { text: generateRandomString(), size: "text-4xl", color: "text-gray-400" },
      { text: generateRandomString(), size: "text-2xl", color: "text-neutral-300" },
      { text: generateRandomString().toLowerCase(), size: "text-xs", color: "text-yellow-300" },
    ]);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const handleSubmit = () => {
    if (userInput.trim().toLowerCase() === testCases[currentIndex]?.text.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentIndex < testCases.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
    } else {
      setTestCompleted(true);
    }
  };

  const getResultColor = () => {
    if (score >= 4) return "text-green-500";
    if (score > 2) return "text-yellow-500";
    return "text-red-500";
  };

  // Generate random position for text inside the box
  const randomPosition = {
    x: Math.floor(Math.random() * 200) - 100, // Moves within ±100px horizontally
    y: Math.floor(Math.random() * 200) - 100, // Moves within ±100px vertically
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300 p-4">
      <h1 className="text-5xl font-bold mb-6 text-black">Eye Test</h1>

      {testCases.length === 0 ? (
        <p className="text-lg text-gray-300">Loading...</p>
      ) : !testCompleted ? (
        <>
          {/* Text Display Box */}
          <div className="relative flex items-center justify-center w-[1000px] h-[300px] border-black border-2 bg-white p-6 rounded-lg shadow-lg">
            <motion.p
              className={`absolute font-bold ${testCases[currentIndex].size} ${testCases[currentIndex].color} select-none`}
              style={{ userSelect: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: randomPosition.x, y: randomPosition.y }}
              transition={{ duration: 0.5 }}
            >
              {testCases[currentIndex].text}
            </motion.p>
          </div>

          {/* Input and Submit Button */}
          <div className="flex flex-col items-center mt-6">
            <input
              ref={inputRef}
              type="text"
              required
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border p-2 text-center text-lg w-64"
              placeholder="Type the Displayed Phrase"
              maxLength={7}
            />
            <Button
              onClick={handleSubmit}
              disabled={userInput.length < 7}
              className={`mt-4 px-6 py-3 text-white text-sm font-medium rounded ${
                userInput.length < 7 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className={`text-2xl font-bold ${getResultColor()}`}>Your Score: {score}/5</h2>
          <p className="mt-2 text-lg text-white">
            {score >= 4 ? "Great vision!" : score >= 2 ? "Moderate vision, consider an eye test." : "You should get an eye checkup."}
          </p>
          <div className="flex gap-4 mt-6">
            <Button onClick={() => router.push("/products")} className="bg-[#28b4a4] hover:bg-[#28b4a4]/90 text-white px-6 py-3 text-sm font-medium">
              Back to Home
            </Button>
            {score < 2 && (
              <Button
                onClick={() => window.open("https://www.dragarwal.com/appointment-booking-online/", "_blank")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-sm font-medium"
              >
                Book an Eye Test
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
