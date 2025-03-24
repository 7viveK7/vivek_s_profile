"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { Send, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { useForm as useFormspree } from "@formspree/react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [state, submitForm] = useFormspree("mqapbnbj")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    if (state.succeeded) {
      form.reset()
    }
  }, [state.succeeded, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitForm(values)
  }

  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "7680900838" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "vivekanandamalladi9@gmail.com" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Hyderabad, India" },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/vivekdev16",
      link: "https://www.linkedin.com/in/vivekdev16/",
    },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/vivekdev", link: "#" },
  ]

  return (
    <section className="relative overflow-hidden bg-zinc-900/50 py-20" id="contact" ref={ref}>
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
          <p className="mb-12 text-gray-400">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">{item.label}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="mb-4 text-lg font-medium">Core Competencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Front-End Development",
                      "Web Application Development",
                      "UI/UX Design",
                      "API Integration",
                      "Code Optimization",
                      "Mobile Applications",
                    ].map((skill, index) => (
                      <span key={index} className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                {state.succeeded ? (
                  <div className="text-center p-6 space-y-4">
                    <div className="text-green-500 text-2xl">🎉</div>
                    <h3 className="text-xl font-semibold text-green-400">Message Sent!</h3>
                    <p className="text-gray-400">Thank you for reaching out. I'll respond within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-6 text-xl font-semibold">Send Me a Message</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Project inquiry" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell me about your project..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {state.errors && (
                          <div className="text-red-500 text-sm">
                            {state.errors.map((error, index) => (
                              <p key={index}>{error.message}</p>
                            ))}
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full transition-transform hover:scale-[1.02]"
                          disabled={state.submitting}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {state.submitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="white" strokeWidth="0.1" />
          ))}
        </svg>
      </div>
    </section>
  )
}