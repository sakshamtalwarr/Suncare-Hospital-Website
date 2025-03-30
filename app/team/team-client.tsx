"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Search, Mail, Phone, Calendar } from "lucide-react"

export default function TeamClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredDoctors = teamMembers.filter(
    (doctor) =>
      (selectedDepartment === "all" || doctor.department === selectedDepartment) &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Suncare Hospital Team"
          fill
          className="object-cover brightness-[0.7] z-0"
          priority
          /* 
            Team page hero image
            - Using priority attribute for faster initial loading
            - Responsive sizing with fill property
            - Will be replaced with actual team photo from Gohana facility
            - Brightness adjusted for better text visibility
          */
        />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Meet Our Team</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Our dedicated healthcare professionals are committed to providing exceptional care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <Tabs
              defaultValue="all"
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="cardiology">Cardiology</TabsTrigger>
                <TabsTrigger value="neurology">Neurology</TabsTrigger>
                <TabsTrigger value="pediatrics">Pediatrics</TabsTrigger>
                <TabsTrigger value="orthopedics">Orthopedics</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search doctors..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-64">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      /* 
                        Doctor profile image
                        - Lazy loaded by default (below the fold)
                        - Consistent height across all profiles
                        - Will be replaced with actual doctor photos from Gohana facility
                      */
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-white">
                        {doctor.department}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                    <p className="text-muted-foreground mt-2 text-sm line-clamp-3">{doctor.bio}</p>

                    <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.availability}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        const message = `I would like to book an appointment with ${doctor.name} (${doctor.specialty})`
                        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank")
                      }}
                      /* 
                        WhatsApp appointment button
                        - Redirects to hospital's WhatsApp number: +91 98765 43210
                        - Pre-fills message with doctor's name and specialty
                        - Opens in new tab for better user experience
                      */
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Department Heads Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Department Heads</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Meet the experienced professionals leading our specialized departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentHeads.map((head, index) => (
              <motion.div
                key={head.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                  <Image src={head.image || "/placeholder.svg"} alt={head.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{head.name}</h3>
                <p className="text-primary font-medium">{head.title}</p>
                <p className="text-muted-foreground mt-2">{head.department} Department</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-primary/70 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="text-white/90 text-lg max-w-[600px]">
                We're always looking for talented and compassionate healthcare professionals to join our team. Explore
                career opportunities at Suncare Hospital.
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

interface TeamMember {
  id: string
  name: string
  specialty: string
  department: string
  bio: string
  image: string
  email: string
  phone: string
  availability: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    department: "cardiology",
    bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in interventional cardiology and heart failure management.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Johnson",
    email: "s.johnson@suncarehospital.com",
    phone: "Ext. 1234",
    availability: "Mon, Wed, Fri",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    department: "neurology",
    bio: "Dr. Chen is a renowned neurologist specializing in stroke treatment and neurodegenerative disorders. He has published numerous research papers on Alzheimer's disease.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Chen",
    email: "m.chen@suncarehospital.com",
    phone: "Ext. 1235",
    availability: "Tue, Thu, Sat",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    department: "pediatrics",
    bio: "Dr. Rodriguez is a compassionate pediatrician dedicated to children's health. She has special interest in childhood development and preventive care.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Rodriguez",
    email: "e.rodriguez@suncarehospital.com",
    phone: "Ext. 1236",
    availability: "Mon-Fri",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    department: "orthopedics",
    bio: "Dr. Wilson is an experienced orthopedic surgeon specializing in joint replacement and sports medicine. He has treated several professional athletes throughout his career.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Wilson",
    email: "j.wilson@suncarehospital.com",
    phone: "Ext. 1237",
    availability: "Mon, Wed, Thu",
  },
  {
    id: "5",
    name: "Dr. Lisa Patel",
    specialty: "General Physician",
    department: "general",
    bio: "Dr. Patel is a dedicated general physician with expertise in preventive medicine and chronic disease management. She believes in a holistic approach to patient care.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Patel",
    email: "l.patel@suncarehospital.com",
    phone: "Ext. 1238",
    availability: "Tue-Sat",
  },
  {
    id: "6",
    name: "Dr. Robert Thompson",
    specialty: "Cardiologist",
    department: "cardiology",
    bio: "Dr. Thompson specializes in non-invasive cardiology and cardiac imaging. He has extensive experience in echocardiography and stress testing.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Thompson",
    email: "r.thompson@suncarehospital.com",
    phone: "Ext. 1239",
    availability: "Mon, Tue, Thu",
  },
  {
    id: "7",
    name: "Dr. Jennifer Lee",
    specialty: "Neurologist",
    department: "neurology",
    bio: "Dr. Lee is a neurologist with expertise in epilepsy and sleep disorders. She is dedicated to improving the quality of life for patients with neurological conditions.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Lee",
    email: "j.lee@suncarehospital.com",
    phone: "Ext. 1240",
    availability: "Wed-Sat",
  },
  {
    id: "8",
    name: "Dr. David Martinez",
    specialty: "Pediatrician",
    department: "pediatrics",
    bio: "Dr. Martinez is a pediatrician with special interest in childhood asthma and allergies. He is known for his gentle approach with young patients.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Martinez",
    email: "d.martinez@suncarehospital.com",
    phone: "Ext. 1241",
    availability: "Mon, Wed, Fri",
  },
  {
    id: "9",
    name: "Dr. Sophia Kim",
    specialty: "Orthopedic Surgeon",
    department: "orthopedics",
    bio: "Dr. Kim specializes in spine surgery and has pioneered minimally invasive techniques. She is committed to helping patients regain mobility and reduce pain.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Kim",
    email: "s.kim@suncarehospital.com",
    phone: "Ext. 1242",
    availability: "Tue, Thu, Sat",
  },
  {
    id: "10",
    name: "Dr. Thomas Brown",
    specialty: "General Physician",
    department: "general",
    bio: "Dr. Brown has over 20 years of experience in family medicine. He focuses on building long-term relationships with patients and providing comprehensive care.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Brown",
    email: "t.brown@suncarehospital.com",
    phone: "Ext. 1243",
    availability: "Mon-Fri",
  },
  {
    id: "11",
    name: "Dr. Maria Gonzalez",
    specialty: "Cardiologist",
    department: "cardiology",
    bio: "Dr. Gonzalez specializes in preventive cardiology and women's heart health. She is passionate about educating patients on heart disease prevention.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Gonzalez",
    email: "m.gonzalez@suncarehospital.com",
    phone: "Ext. 1244",
    availability: "Mon, Wed, Fri",
  },
  {
    id: "12",
    name: "Dr. William Taylor",
    specialty: "Neurologist",
    department: "neurology",
    bio: "Dr. Taylor is a neurologist specializing in movement disorders such as Parkinson's disease. He is involved in clinical research to develop new treatments.",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Taylor",
    email: "w.taylor@suncarehospital.com",
    phone: "Ext. 1245",
    availability: "Tue, Thu, Sat",
  },
]

interface DepartmentHead {
  id: string
  name: string
  title: string
  department: string
  image: string
}

const departmentHeads: DepartmentHead[] = [
  {
    id: "1",
    name: "Dr. Elizabeth Carter",
    title: "Chief of Cardiology",
    department: "Cardiology",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Carter",
  },
  {
    id: "2",
    name: "Dr. Richard Wang",
    title: "Chief of Neurology",
    department: "Neurology",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Wang",
  },
  {
    id: "3",
    name: "Dr. Patricia Adams",
    title: "Chief of Pediatrics",
    department: "Pediatrics",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Adams",
  },
  {
    id: "4",
    name: "Dr. Samuel Jackson",
    title: "Chief of Orthopedics",
    department: "Orthopedics",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Jackson",
  },
  {
    id: "5",
    name: "Dr. Olivia Bennett",
    title: "Chief of Internal Medicine",
    department: "Internal Medicine",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Bennett",
  },
  {
    id: "6",
    name: "Dr. Daniel Miller",
    title: "Chief of Surgery",
    department: "Surgery",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Miller",
  },
]

