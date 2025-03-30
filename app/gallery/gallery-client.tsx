"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "@/components/image-gallery"
import { ImageModal } from "@/components/image-modal"
import { motion } from "framer-motion"
import { Grid, Columns } from "lucide-react"

export default function GalleryClient() {
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Suncare Hospital Gallery"
          fill
          className="object-cover brightness-[0.7] z-0"
          priority
          /* 
            Gallery hero image
            - Using priority attribute as it's above the fold
            - Responsive sizing with fill property
            - Brightness adjusted for text overlay visibility
            - Will be replaced with actual hospital gallery entrance photo
          */
        />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Our Gallery</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Explore our state-of-the-art facilities, modern equipment, and dedicated staff.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <Tabs
              defaultValue="all"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "carousel" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("carousel")}
              >
                <Columns className="h-4 w-4" />
                <span className="sr-only">Carousel view</span>
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      /* 
                        Gallery thumbnail image
                        - Using aspect-square for consistent grid layout
                        - Lazy loaded by default (not using priority)
                        - Hover effect with scale transform
                        - Will be replaced with actual hospital facility photos
                      */
                    />
                  </div>
                  {/* Image overlay and caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <ImageGallery images={filteredImages} onImageClick={handleImageClick} />
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={handleCloseModal} galleryImages={filteredImages} />}
    </main>
  )
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description: string
  category: string
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/placeholder.svg?height=800&width=800&text=Reception",
    alt: "Hospital Reception",
    title: "Modern Reception Area",
    description: "Our welcoming reception area designed for patient comfort",
    category: "facilities",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=800&width=800&text=Patient+Room",
    alt: "Patient Room",
    title: "Private Patient Room",
    description: "Comfortable and well-equipped private patient rooms",
    category: "facilities",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=800&width=800&text=MRI+Scanner",
    alt: "MRI Scanner",
    title: "Advanced MRI Scanner",
    description: "State-of-the-art MRI scanner for accurate diagnostics",
    category: "equipment",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=800&width=800&text=Surgery+Room",
    alt: "Surgery Room",
    title: "Modern Operating Theater",
    description: "Fully equipped operating theater with the latest technology",
    category: "facilities",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=800&width=800&text=Doctor+Team",
    alt: "Doctor Team",
    title: "Our Expert Doctors",
    description: "Our team of experienced and dedicated medical professionals",
    category: "staff",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=800&width=800&text=Lab+Equipment",
    alt: "Laboratory Equipment",
    title: "Advanced Laboratory",
    description: "Cutting-edge laboratory equipment for accurate testing",
    category: "equipment",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=800&width=800&text=Nurses+Station",
    alt: "Nurses Station",
    title: "Nurses Station",
    description: "Efficient nurses station for coordinated patient care",
    category: "facilities",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=800&width=800&text=CT+Scanner",
    alt: "CT Scanner",
    title: "CT Scanner",
    description: "High-resolution CT scanner for detailed imaging",
    category: "equipment",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=800&width=800&text=Medical+Staff",
    alt: "Medical Staff",
    title: "Dedicated Medical Staff",
    description: "Our compassionate medical staff providing excellent care",
    category: "staff",
  },
  {
    id: "10",
    src: "/placeholder.svg?height=800&width=800&text=Waiting+Area",
    alt: "Waiting Area",
    title: "Comfortable Waiting Area",
    description: "Relaxing waiting area for patients and visitors",
    category: "facilities",
  },
  {
    id: "11",
    src: "/placeholder.svg?height=800&width=800&text=Health+Camp",
    alt: "Health Camp",
    title: "Community Health Camp",
    description: "Annual health camp providing free check-ups to the community",
    category: "events",
  },
  {
    id: "12",
    src: "/placeholder.svg?height=800&width=800&text=Blood+Donation",
    alt: "Blood Donation Drive",
    title: "Blood Donation Drive",
    description: "Regular blood donation drives organized by our hospital",
    category: "events",
  },
  {
    id: "13",
    src: "/placeholder.svg?height=800&width=800&text=Ultrasound",
    alt: "Ultrasound Machine",
    title: "Advanced Ultrasound",
    description: "High-resolution ultrasound equipment for accurate diagnostics",
    category: "equipment",
  },
  {
    id: "14",
    src: "/placeholder.svg?height=800&width=800&text=Doctors+Meeting",
    alt: "Doctors Meeting",
    title: "Medical Conference",
    description: "Our doctors participating in medical conferences and continuing education",
    category: "events",
  },
  {
    id: "15",
    src: "/placeholder.svg?height=800&width=800&text=Nursing+Team",
    alt: "Nursing Team",
    title: "Expert Nursing Team",
    description: "Our skilled nursing team providing compassionate care",
    category: "staff",
  },
  {
    id: "16",
    src: "/placeholder.svg?height=800&width=800&text=Hospital+Exterior",
    alt: "Hospital Exterior",
    title: "Hospital Building",
    description: "The modern exterior of Suncare Hospital",
    category: "facilities",
  },
]

