import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Extract the last user message
    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    // Create context from previous messages
    const context = messages
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Generate AI response
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `
        You are an AI assistant for Vivekananda Malladi, a Frontend Developer with 2+ years of experience.
        
        About Vivekananda:
        - Frontend Developer with expertise in React, React Native, and Next.js
        - 2+ years of professional experience
        - Skills: React Native, Next.js, React.js, JavaScript, TypeScript, Node.js, HTML, CSS
        - Previous work at Farmreach Technologies and Shivam Medisoft Services
        - Projects include HR Management App, E-commerce web application, and more
        - Based in Hyderabad, India
        - Contact: vivekanandamalladi9@gmail.com, 7680900838
        
        Previous conversation:
        ${context}
        
        User: ${lastUserMessage.content}
        
        Provide a helpful, friendly, and concise response as Vivekananda's assistant. Focus on guiding the user about Vivekananda's skills, experience, and how to hire him. Keep your response under 150 words.
      `,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

