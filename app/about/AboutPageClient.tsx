"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline } from "@/components/timeline"
import { motion } from "framer-motion"

const values = [
  "Excellence",
  "Compassion",
  "Integrity",
  "Teamwork",
  "Innovation",
  "Respect",
  "Accountability",
  "Diversity",
]

const timelineEvents = [
  {
    year: "1998",
    title: "Foundation",
    description: "Suncare Hospital was founded with a vision to provide quality healthcare services to the community.",
  },
  {
    year: "2003",
    title: "Expansion",
    description:
      "Expanded our facilities to include specialized departments for cardiology, neurology, and pediatrics.",
  },
  {
    year: "2008",
    title: "Research Center",
    description: "Established a dedicated research center to advance medical knowledge and treatments.",
  },
  {
    year: "2012",
    title: "Technology Upgrade",
    description: "Invested in cutting-edge medical technology to enhance diagnostic and treatment capabilities.",
  },
  {
    year: "2015",
    title: "Community Outreach",
    description: "Launched extensive community health programs to promote wellness and preventive care.",
  },
  {
    year: "2020",
    title: "New Wing",
    description: "Opened a new wing with advanced surgical suites and increased patient capacity.",
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description:
      "Implemented comprehensive digital health solutions to improve patient experience and care coordination.",
  },
]

const leadershipTeam = [
  {
    name: "Dr. Robert Chen",
    position: "Chief Executive Officer",
    bio: "With over 25 years of experience in healthcare management, Dr. Chen leads Suncare Hospital with a focus on innovation and excellence.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Chen",
  },
  {
    name: "Dr. Maria Rodriguez",
    position: "Chief Medical Officer",
    bio: "A board-certified surgeon with extensive clinical experience, Dr. Rodriguez ensures the highest standards of medical care across all departments.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Rodriguez",
  },
  {
    name: "Jennifer Williams",
    position: "Chief Nursing Officer",
    bio: "With a passion for patient-centered care, Jennifer oversees our nursing staff and ensures exceptional care delivery.",
    image: "/placeholder.svg?height=400&width=400&text=J.+Williams",
  },
  {
    name: "Dr. David Park",
    position: "Director of Research",
    bio: "Leading our research initiatives, Dr. Park works to advance medical knowledge and bring innovative treatments to our patients.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Park",
  },
  {
    name: "Sarah Johnson",
    position: "Chief Operations Officer",
    bio: "Sarah ensures the smooth operation of all hospital facilities and services, focusing on efficiency and quality.",
    image: "/placeholder.svg?height=400&width=400&text=S.+Johnson",
  },
  {
    name: "Michael Thompson",
    position: "Chief Financial Officer",
    bio: "Michael manages the hospital's financial resources to support our mission of providing exceptional healthcare.",
    image: "/placeholder.svg?height=400&width=400&text=M.+Thompson",
  },
]

const facilities = [
  "200+ patient beds with private and semi-private rooms",
  "24/7 emergency department with trauma capabilities",
  "Advanced diagnostic imaging center (MRI, CT, X-ray, Ultrasound)",
  "State-of-the-art surgical suites with robotic surgery capabilities",
  "Specialized intensive care units (ICU, CCU, NICU)",
  "Comprehensive outpatient services and rehabilitation center",
  "Modern laboratory with rapid testing capabilities",
  "Dedicated research facilities and clinical trial center",
]

export default function AboutPageClient() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Suncare Hospital Building"
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">About Suncare Hospital</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Dedicated to providing exceptional healthcare with compassion and expertise since 1998.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Medical Team"
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
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                <p className="text-muted-foreground">
                  At Suncare Hospital, our mission is to provide exceptional healthcare services that improve the health
                  and well-being of the individuals and communities we serve. We are committed to delivering
                  compassionate, patient-centered care of the highest quality and safety in a healing environment.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be the region's premier healthcare provider, recognized for excellence in patient care, innovative
                  medical treatments, and contributions to medical research and education. We strive to create a
                  healthier community through leadership, partnership, and service.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {values.map((value, index) => (
                    <motion.li
                      key={value}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{value}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Journey</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              From our humble beginnings to becoming a leading healthcare provider
            </p>
          </div>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Meet the experienced professionals guiding Suncare Hospital
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="h-64 relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.position}</p>
                    <p className="text-muted-foreground mt-2">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">State-of-the-Art Facilities</h2>
              <p className="text-muted-foreground">
                Suncare Hospital is equipped with the latest medical technology and modern facilities to provide the
                highest standard of care. Our hospital features:
              </p>
              <ul className="space-y-2">
                {facilities.map((facility, index) => (
                  <motion.li
                    key={facility}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span>{facility}</span>
                  </motion.li>
                ))}
              </ul>
              <Button size="lg">Take a Virtual Tour</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 grid grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-40 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Facility ${i}`}
                    alt={`Hospital Facility ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="text-primary-foreground/90 text-lg max-w-[600px]">
                We're always looking for talented and compassionate professionals to join our team. Explore career
                opportunities at Suncare Hospital.
              </p>
            </div>
            <div>
              <Button size="lg" variant="secondary">
                View Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

