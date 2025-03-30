"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ServicesClientPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Suncare Hospital Services"
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Our Services</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Comprehensive healthcare services tailored to meet your needs with expertise and compassion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Healthcare Services</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              At Suncare Hospital, we offer a wide range of medical services to address all your healthcare needs under
              one roof.
            </p>
          </div>

          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="surgical">Surgical</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              <TabsTrigger value="specialty">Specialty Care</TabsTrigger>
            </TabsList>
            <TabsContent value="medical" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicalServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="surgical" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surgicalServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="diagnostic" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagnosticServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="specialty" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialtyServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Service Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Featured Service
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Advanced Cardiac Care</h2>
              <p className="text-muted-foreground">
                Our Cardiac Center of Excellence provides comprehensive care for heart conditions, from prevention and
                diagnosis to treatment and rehabilitation. Our team of cardiologists, cardiac surgeons, and specialized
                nurses work together to deliver personalized care using the latest technologies and techniques.
              </p>
              <ul className="space-y-2">
                {cardiacServices.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
              <Button>Learn More About Cardiac Care</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=Cardiac+Care"
                alt="Advanced Cardiac Care"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance & Payment Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Insurance & Payment Options</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              We work with most major insurance providers and offer flexible payment options
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {insuranceProviders.map((provider, index) => (
              <motion.div
                key={provider}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-20 bg-muted rounded-lg"
              >
                <span className="font-medium">{provider}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't see your insurance provider? Contact our billing department to discuss your options.
            </p>
            <Button variant="outline" className="mt-4">
              Contact Billing Department
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need to schedule an appointment?</h2>
              <p className="text-primary-foreground/90 text-lg max-w-[600px]">
                Our team is ready to help you find the right care for your needs. Schedule an appointment today.
              </p>
            </div>
            <div>
              <Button size="lg" variant="secondary">
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
        <div className="h-48 relative">
          <Image
            src={service.image || "/placeholder.svg?height=300&width=400"}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-muted-foreground mb-4">{service.description}</p>
          <Link href={`/services/${service.slug}`} className="inline-flex items-center text-primary hover:underline">
            Learn more
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const medicalServices = [
  {
    title: "General Medicine",
    description:
      "Comprehensive care for patients of all ages, focusing on prevention, diagnosis, and treatment of diseases.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "general-medicine",
  },
  {
    title: "Internal Medicine",
    description: "Specialized care for adults, focusing on the prevention, diagnosis, and treatment of adult diseases.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "internal-medicine",
  },
  {
    title: "Pediatrics",
    description: "Dedicated care for infants, children, and adolescents, ensuring healthy development.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "pediatrics",
  },
  {
    title: "Geriatrics",
    description: "Specialized care for elderly patients, addressing the unique health needs of aging.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "geriatrics",
  },
  {
    title: "Cardiology",
    description: "Specialized care for heart conditions with advanced diagnostic and treatment options.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "cardiology",
  },
  {
    title: "Neurology",
    description: "Specialized care for disorders of the nervous system, brain, and spinal cord.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "neurology",
  },
]

const surgicalServices = [
  {
    title: "General Surgery",
    description: "A wide range of surgical procedures performed by experienced surgeons.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "general-surgery",
  },
  {
    title: "Orthopedic Surgery",
    description: "Surgical treatment for conditions affecting the musculoskeletal system.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "orthopedic-surgery",
  },
  {
    title: "Cardiac Surgery",
    description: "Advanced surgical procedures for heart conditions.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "cardiac-surgery",
  },
  {
    title: "Neurosurgery",
    description: "Surgical treatment for conditions affecting the brain, spine, and nervous system.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "neurosurgery",
  },
  {
    title: "Minimally Invasive Surgery",
    description: "Advanced techniques that reduce recovery time and minimize scarring.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "minimally-invasive-surgery",
  },
  {
    title: "Robotic Surgery",
    description: "Cutting-edge robotic technology for precise surgical procedures.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "robotic-surgery",
  },
]

const diagnosticServices = [
  {
    title: "Laboratory Services",
    description: "Comprehensive testing for accurate diagnosis and treatment planning.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "laboratory-services",
  },
  {
    title: "Radiology",
    description: "Advanced imaging services including X-ray, CT, and MRI.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "radiology",
  },
  {
    title: "Ultrasound",
    description: "Non-invasive imaging for a variety of diagnostic purposes.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "ultrasound",
  },
  {
    title: "Cardiac Diagnostics",
    description: "Specialized tests to evaluate heart function and diagnose cardiac conditions.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "cardiac-diagnostics",
  },
  {
    title: "Endoscopy",
    description: "Minimally invasive procedures to examine internal organs and tissues.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "endoscopy",
  },
  {
    title: "Pathology",
    description: "Expert analysis of tissues and cells for accurate diagnosis.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "pathology",
  },
]

const specialtyServices = [
  {
    title: "Oncology",
    description: "Comprehensive cancer care including diagnosis, treatment, and support services.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "oncology",
  },
  {
    title: "Obstetrics & Gynecology",
    description: "Specialized care for women's health needs throughout all stages of life.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "obstetrics-gynecology",
  },
  {
    title: "Dermatology",
    description: "Diagnosis and treatment of conditions affecting the skin, hair, and nails.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "dermatology",
  },
  {
    title: "Rehabilitation",
    description: "Comprehensive rehabilitation services to help patients regain function and independence.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "rehabilitation",
  },
  {
    title: "Mental Health",
    description: "Compassionate care for mental health conditions and emotional well-being.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "mental-health",
  },
  {
    title: "Pain Management",
    description: "Specialized care to help patients manage chronic pain and improve quality of life.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "pain-management",
  },
]

const cardiacServices = [
  "Non-invasive cardiac testing (ECG, Echocardiogram, Stress Testing)",
  "Cardiac catheterization and interventional procedures",
  "Electrophysiology studies and treatment for arrhythmias",
  "Advanced cardiac imaging (Cardiac CT, MRI)",
  "Cardiac rehabilitation programs",
  "Preventive cardiology and risk assessment",
]

const insuranceProviders = [
  "Blue Cross",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Medicare",
  "Medicaid",
  "Humana",
  "Kaiser",
  "Anthem",
  "HealthNet",
  "Tricare",
  "MetLife",
]

