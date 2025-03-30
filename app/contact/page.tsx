"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Contact Suncare Hospital"
          fill
          className="object-cover brightness-[0.7] z-0"
          priority
        />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              We're here to help. Reach out to us with any questions or to schedule an appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our services or need to schedule an appointment? Fill out the form and our team
                  will get back to you as soon as possible.
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        {/* Primary contact number - also used for WhatsApp appointments */}
                        Main: +91 98765 43210
                      </p>
                      <p className="text-muted-foreground">Emergency: +91 98765 43211</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">info@suncarehospital.com</p>
                      <p className="text-muted-foreground">appointments@suncarehospital.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        {/* Main hospital facility in Gohana, Haryana */}
                        123 Delhi Road
                      </p>
                      <p className="text-muted-foreground">Gohana, Haryana 131301, India</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground">Sunday: 10:00 AM - 2:00 PM</p>
                      <p className="text-muted-foreground font-medium mt-1">Emergency Care: 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Find Us</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Conveniently located in the heart of Wellness City
            </p>
          </div>
          <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27667.63553726506!2d76.68752!3d29.13756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dc9c8b95ea1c1%3A0x9f6067a9a59da132!2sGohana%2C%20Haryana%20131301!5e0!3m2!1sen!2sin!4v1679767901424!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Suncare Hospital Location in Gohana, Haryana"
              /* 
                Google Maps embed showing hospital location in Gohana
                - Using lazy loading for performance optimization
                - Will be updated with exact coordinates once available
              */
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">Ample parking available. Public transportation accessible.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Find answers to common questions about Suncare Hospital
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need immediate assistance?</h2>
              <p className="text-primary-foreground/90 text-lg max-w-[600px]">
                Our patient care team is available 24/7 to answer your questions and address your concerns.
              </p>
            </div>
            <div>
              <Button size="lg" variant="secondary">
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const faqs = [
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment by calling our main number at (555) 123-4567, using our online appointment form, or contacting us via email at appointments@suncarehospital.com.",
  },
  {
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Blue Cross, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. Please contact our billing department for specific information about your insurance coverage.",
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Yes, our emergency department is open 24/7 to provide immediate care for urgent medical conditions. For life-threatening emergencies, please call 911.",
  },
  {
    question: "How can I access my medical records?",
    answer:
      "You can access your medical records through our patient portal. If you need assistance, please contact our medical records department at (555) 123-4567 ext. 789.",
  },
  {
    question: "Do you offer telehealth services?",
    answer:
      "Yes, we offer telehealth services for certain types of appointments. Please call our main number to determine if your visit is appropriate for telehealth.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring your insurance card, photo ID, list of current medications, medical history, and any relevant medical records or test results from previous providers.",
  },
]

