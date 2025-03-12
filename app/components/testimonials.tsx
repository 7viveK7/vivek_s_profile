"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const testimonials = [
    {
      quote:
        "Vivekananda is an exceptional frontend developer who consistently delivers high-quality code. His attention to detail and problem-solving skills make him a valuable asset to any team.",
      author: "Rajesh Kumar",
      position: "Engineering Manager, Farmreach Technologies",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Working with Vivekananda was a pleasure. He has a deep understanding of React and React Native, and his ability to create intuitive user interfaces is impressive.",
      author: "Priya Sharma",
      position: "Product Manager, Farmreach Technologies",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Vivekananda's expertise in frontend development helped us deliver a complex project on time. His code is clean, well-structured, and easy to maintain.",
      author: "Amit Patel",
      position: "CTO, Shivam Medisoft Services",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20" id="testimonials" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          What People Say
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Feedback from colleagues and clients who have worked with me on various projects.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-6">
                  <QuoteIcon className="mb-4 h-8 w-8 text-blue-400 opacity-50" />
                  <p className="mb-6 text-gray-300">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

