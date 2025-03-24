"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBDDd-3aLjN-TEcG3m0ZzcPU7PjH7kkMYM"||process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  apiVersion: "v1beta" // Or "v1" if still having issues
});
const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 40,
};



const suggestedQuestions = [
  "What are Vivek's key skills?",
  "How can I hire Vivek for my project?",
  "What experience does Vivek have?",
  "What technologies does Vivek work with?",
  "Can you tell me about Vivek's recent projects?",
  "What is Vivek's availability?",
  "How can I contact Vivek?",
  "What makes Vivek stand out from other developers?",
]


type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "👋 Hi there! I'm Vivek's AI assistant. How can I help you today?",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || "YOUR_API_KEY");
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Function to generate a random question
  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestedQuestions.length);
    setRandomQuestion(suggestedQuestions[randomIndex]);
  };

  // Generate a random question on component mount
  useEffect(() => {
    generateRandomQuestion();
    const interval = setInterval(generateRandomQuestion, 8000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatbot = document.getElementById("chatbot");
      const chatbotButton = document.getElementById("chatbot-button");

      if (
        isOpen &&
        chatbot &&
        !chatbot.contains(event.target as Node) &&
        chatbotButton &&
        !chatbotButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const context = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n");

      setIsTyping(true);

      const prompt = `
        You are an AI assistant for Vivekananda Malladi, a Frontend Developer with 3+ years of experience.
        Previous conversation:
        ${context}
        User: ${input}
        Provide a helpful response as Vivekananda's assistant. Keep your response under 150 words.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      setTimeout(() => {
        setIsTyping(false);
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsTyping(false);
      setIsLoading(false);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSubmit(new Event("submit") as unknown as React.FormEvent);
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        id="chatbot-button"
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button className="h-14 w-14 rounded-full bg-blue-500" aria-label="Open chat">
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
        {/* Floating question bubble */}
        {!isOpen && (
          <motion.div
            className="absolute -top-16 right-0 w-64 rounded-lg bg-zinc-800 p-3 text-sm shadow-lg"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-blue-400" />
              <p>{randomQuestion}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Chatbot Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot"
            className="fixed bottom-24 right-6 z-50 w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="flex items-center justify-between rounded-t-lg bg-zinc-800 p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">Vivek's Assistant</h3>
                  <p className="text-xs text-gray-400">Ask me anything about Vivek</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-zinc-800 text-white"}`}>
                      <div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-center gap-2 rounded-lg bg-zinc-800 p-3 text-white">
                      <div className="flex space-x-1">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            {showSuggestions && (
              <div className="border-t border-zinc-800 p-3">
                <p className="mb-2 text-xs text-gray-400">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-zinc-800 p-4">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[60px] resize-none bg-zinc-800"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-10 w-10 shrink-0">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}