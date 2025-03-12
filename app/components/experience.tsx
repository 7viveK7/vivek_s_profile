"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, BriefcaseIcon, GraduationCapIcon } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      title: "Front-end Developer",
      company: "Farmreach Technologies Private Limited",
      period: "Apr 2023 - Jan 2025",
      type: "work",
      description: "Led frontend development for web applications using React.js and Next.js.",
      achievements: [
        "Engineered and maintained the front-end architecture of a large-scale web application",
        "Developed and implemented 10+ key features, contributing to a 25% increase in user retention",
        "Spearheaded the development of 20+ user-facing screens",
        "Integrated REST and GraphQL APIs for optimized data handling",
        "Implemented responsive design principles and ensured cross-browser compatibility",
        "Leveraged Redux and Context API for streamlined state management",
        "Integrated Google Maps API for location-based services",
        "Resolved over 50+ critical bugs, improving application stability",
        "Reduced build time by 60% through code optimization techniques",
        "Mentored 4 junior developers, increasing team productivity by 20%",
      ],
    },
    {
      title: "Cross Platform Mobile Developer",
      company: "Farmreach Technologies Private Limited",
      period: "Apr 2023 - Jan 2025",
      type: "work",
      description: "Developed cross-platform mobile applications using React Native and Expo.",
      achievements: [
        "Developed a cross-platform mobile application serving over 5,000+ users on Android and iOS",
        "Integrated third-party libraries and APIs to enhance functionality",
        "Implemented MeiliSearch with sub-50ms response times for real-time search capabilities",
        "Collaborated with cross-functional teams to define features and prioritize tasks",
        "Utilized Expo CLI and EAS Build for streamlined deployment",
        "Implemented OTA updates, push notifications, and background tasks",
        "Achieved a 4.6/5 star rating on app stores",
      ],
    },
    {
      title: "Front-end Developer Intern",
      company: "Shivam Medisoft Services Pvt Ltd",
      period: "Sep 2022 - Mar 2023",
      type: "work",
      description: "Gained practical experience in front-end development within a fast-paced environment.",
      achievements: [
        "Collaborated with backend and UX teams to create user-centered interfaces",
        "Developed multiple user-facing screens, expanding the application's UI",
        "Implemented dynamic UI elements using CSS Grid",
        "Played an active role in identifying and resolving bugs",
      ],
    },
    {
      title: "Bachelor of Technology in Mechanical Engineering",
      company: "Rajiv Gandhi University of Knowledge Technologies",
      period: "2018 - 2022",
      type: "education",
      description: "Completed undergraduate studies with a focus on engineering principles and problem-solving.",
      achievements: [],
    },
  ]

  return (
    <section className="bg-zinc-900/50 py-20" id="experience" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Work Experience & Education
        </motion.h2>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line - only visible on md and up */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-blue-500/30 md:block md:left-1/2 md:-ml-0.5"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 md:mb-0">
              <motion.div
                className={`relative md:flex ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline dot - centered on the line for md and up */}
                <div className="absolute left-6 top-6 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-blue-500/30 bg-zinc-900 md:flex md:left-1/2">
                  {exp.type === "work" ? (
                    <BriefcaseIcon className="h-5 w-5 text-blue-400" />
                  ) : (
                    <GraduationCapIcon className="h-5 w-5 text-blue-400" />
                  )}
                </div>

                {/* Mobile timeline dot - only visible on small screens */}
                <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500/30 bg-zinc-900 md:hidden">
                  {exp.type === "work" ? (
                    <BriefcaseIcon className="h-5 w-5 text-blue-400" />
                  ) : (
                    <GraduationCapIcon className="h-5 w-5 text-blue-400" />
                  )}
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:mr-[80px]" : "md:ml-[80px]"}`}
                >
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
                        {exp.type === "work" ? "Work" : "Education"}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {exp.period}
                      </div>
                    </div>

                    <h3 className="mb-1 text-xl font-semibold">{exp.title}</h3>
                    <p className="mb-3 text-blue-400">{exp.company}</p>
                    <p className="mb-4 text-gray-400">{exp.description}</p>

                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="mb-2 font-medium">Key Achievements:</h4>
                        <ul className="space-y-1 text-sm text-gray-400">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 text-blue-400">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Add spacing between timeline items */}
              {index < experiences.length - 1 && <div className="h-12 md:h-24"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

