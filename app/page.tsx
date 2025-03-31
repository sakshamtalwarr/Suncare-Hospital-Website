"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Calendar, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedGradient } from "@/components/animated-gradient"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { ReviewSection } from "@/components/review-section"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/placeholder.jpg?"
          alt="Suncare Hospital"
          fill
          className="object-cover brightness-[0.6] z-0"
          priority
          /* 
            Hero image of Suncare Hospital in Gohana, Haryana
            - Using priority attribute for LCP optimization
            - fill property maintains aspect ratio across screen sizes
            - brightness adjustment for better text contrast
            - Will be replaced with actual hospital building image
          */
        />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Exceptional Healthcare for Your Family
            </h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Providing compassionate care and cutting-edge medical services to our community for over 25 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() =>
                  window.open(
                    "https://wa.me/919876543210?text=I%20would%20like%20to%20book%20an%20appointment%20at%20Suncare%20Hospital",
                    "_blank",
                  )
                }
              >
                {/* WhatsApp redirect button for appointment booking */}
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <Users className="h-10 w-10 text-primary mb-2" />
              <AnimatedCounter value={5000} duration={2} className="text-4xl font-bold" />
              <p className="text-muted-foreground">Patients Served</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <AnimatedCounter value={20} duration={2} className="text-4xl font-bold" />
              <p className="text-muted-foreground">Years of Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <Award className="h-10 w-10 text-primary mb-2" />
              <AnimatedCounter value={15} duration={2} className="text-4xl font-bold" />
              <p className="text-muted-foreground">Medical Specialties</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Comprehensive healthcare services tailored to meet your needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Link href="/services" className="inline-flex items-center text-primary hover:underline">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button asChild size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 relative overflow-hidden">
        <AnimatedGradient />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Medical professionals"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us?</h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Reviews Section */}
      <ReviewSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to experience exceptional care?</h2>
              <p className="text-primary-foreground/90 text-lg max-w-[600px]">
                Schedule your appointment today and take the first step towards better health.
              </p>
            </div>
            <div>
              <Button
                size="lg"
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://wa.me/919876543210?text=I%20would%20like%20to%20book%20an%20appointment%20at%20Suncare%20Hospital",
                    "_blank",
                  )
                }
              >
                {/* WhatsApp redirect button for appointment booking */}
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const services = [
  {
    title: "General Medicine",
    description:
      "Comprehensive care for patients of all ages, focusing on prevention, diagnosis, and treatment of diseases.",
    image: "/generalmedicine.jpg?height=50&width=100",
  },
  {
    title: "Gynaecologist",
    description: "Comprehensive care for women at every stage of life – from routine checkups to specialized treatments.",
    image: "/gynae.jpg?height=300&width=400",
  },
  {
    title: "Pediatrics",
    description: "Dedicated care for infants, children, and adolescents, ensuring healthy development.",
    image: "/pediatrician.jpg?height=300&width=400",
  },
  {
    title: "Surgery",
    description: "State-of-the-art surgical procedures performed by experienced specialists.",
    image: "/surgery.jpg?height=300&width=400",
  },
  {
    title: "Orthopedics",
    description: "Expert care for bone and joint conditions, from diagnosis to rehabilitation.",
    image: "/ortho.jpg?height=300&width=400",
  },
  {
    title: "Neurology",
    description: "Specialized care for disorders of the nervous system, brain, and spinal cord.",
    image: "/neuro.jpg?height=300&width=400",
  },
]

import { HeartPulse, Shield, Clock, UserCheck, Stethoscope, BadgeCheck } from "lucide-react"

const whyChooseUs = [
  {
    title: "Expert Medical Team",
    description: "Our team of experienced doctors and specialists are leaders in their fields.",
    icon: UserCheck,
  },
  {
    title: "Advanced Technology",
    description: "We utilize the latest medical technology for accurate diagnosis and treatment.",
    icon: Stethoscope,
  },
  {
    title: "Patient-Centered Care",
    description: "We prioritize your comfort and well-being throughout your healthcare journey.",
    icon: HeartPulse,
  },
  {
    title: "24/7 Emergency Services",
    description: "Round-the-clock emergency care when you need it most.",
    icon: Clock,
  },
  {
    title: "Accredited Facility",
    description: "Our hospital meets the highest standards of healthcare quality and safety.",
    icon: BadgeCheck,
  },
  {
    title: "Comprehensive Care",
    description: "From preventive care to specialized treatments, all under one roof.",
    icon: Shield,
  },
]

const testimonials = [
  {
    name: "Anil Malhotra",
    text: "The care I received at Suncare Hospital was exceptional. The doctors were knowledgeable and took the time to explain everything to me. The staff was friendly and made me feel comfortable throughout my stay.",
    image: "/malereviewcartoon.jpg?height=400&width=400",
  },
  {
    name: "Ajay Patel",
    text: "After my surgery at Suncare Hospital, I was amazed by the level of care and attention I received. The medical team was professional and compassionate, making my recovery process much easier.",
    image: "/malereviewcartoon.jpg?height=300&width=300",
  },
  {
    name: "Sneha Sharma",
    text: "I've been bringing my family to Suncare Hospital for years, and we've always received top-notch care. The pediatric department is especially wonderful with children, making what could be scary visits much more comfortable.",
    image: "/femalereviewcartoon.jpeg?height=200&width=200",
  },
]

