"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const categories = ["all", "web", "mobile", "frontend"]

  const projects = [
    {
      id: 1,
      title: "HR Management App",
      description:
        "Cross-platform mobile application for HR management, streamlining employee onboarding, payroll, and performance review processes.",
      category: "mobile",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Redux", "Expo", "REST API"],
      highlights: [
        "Developed using React Native for iOS and Android",
        "Integrated responsive design principles",
        "Streamlined HR processes",
      ],
    },
    {
      id: 2,
      title: "E-commerce Web Application",
      description: "Dynamic and responsive e-commerce web application providing a seamless online shopping experience.",
      category: "web",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React.js", "Redux", "Context API", "REST API"],
      highlights: [
        "Built reusable UI components",
        "Implemented efficient state management",
        "Integrated real-time product data",
      ],
    },
    {
      id: 3,
      title: "Farmreach Mobile App",
      description: "Cross-platform mobile application serving over 5,000+ users on both Android and iOS platforms.",
      category: "mobile",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Expo", "MeiliSearch", "GraphQL"],
      highlights: [
        "Implemented real-time search with sub-50ms response times",
        "Utilized Expo CLI and EAS Build for deployment",
        "Achieved 4.6/5 star rating on app stores",
      ],
    },
    {
      id: 4,
      title: "Farmreach Web Dashboard",
      description:
        "Large-scale web application with optimized front-end architecture ensuring code quality and scalability.",
      category: "web",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "TypeScript", "GraphQL", "Google Maps API"],
      highlights: [
        "Reduced build time by 60% through code optimization",
        "Developed 20+ user-facing screens",
        "Integrated Google Maps API for location-based services",
      ],
    },
    {
      id: 5,
      title: "Healthcare UI Components",
      description:
        "Developed user-centered interfaces for healthcare applications, ensuring seamless integration of design and functionality.",
      category: "frontend",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React.js", "CSS Grid", "Tailwind CSS"],
      highlights: [
        "Created dynamic and visually appealing UI elements",
        "Enhanced application responsiveness",
        "Collaborated with UX teams",
      ],
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website showcasing frontend development skills and projects.",
      category: "frontend",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      highlights: [
        "Implemented smooth animations and transitions",
        "Optimized for all device sizes",
        "Integrated contact form functionality",
      ],
    },
  ]

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory,
  )

  return (
    <section className="bg-black py-20" id="projects" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-6 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A selection of my recent work across web and mobile platforms, showcasing my expertise in frontend
          development.
        </motion.p>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm capitalize"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900/50">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="aspect-video w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                      <p className="mb-4 text-sm text-gray-400">{project.description}</p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-500/10 text-blue-400">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <ul className="mb-6 space-y-1 text-sm text-gray-400">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-blue-400">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                        <Button size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

