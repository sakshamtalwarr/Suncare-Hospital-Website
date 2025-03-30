"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Search, Calendar, User, Clock, ArrowRight, Tag } from "lucide-react"

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === null || post.categories.includes(selectedCategory)) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Suncare Hospital Blog"
          fill
          className="object-cover brightness-[0.7] z-0"
          priority
          /* 
            Blog page hero image
            - Using priority attribute as it's above the fold
            - Responsive sizing with fill property
            - Will be replaced with actual hospital image from Gohana facility
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Blog & News</h1>
            <p className="text-xl text-white/90 max-w-[700px]">
              Stay updated with the latest health tips, medical advancements, and hospital news.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="relative w-full mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-[300px] md:h-[400px]">
                      <Image
                        src={filteredPosts[0].image || "/placeholder.svg"}
                        alt={filteredPosts[0].title}
                        fill
                        className="object-cover"
                        /* 
                          Featured blog post image
                          - Responsive height based on screen size
                          - Lazy loaded by default
                          - Will be replaced with actual blog post images
                          - Object-cover ensures proper image display regardless of dimensions
                        */
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <div className="flex gap-2 mb-2">
                          {filteredPosts[0].categories.map((category) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{filteredPosts[0].title}</h2>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{filteredPosts[0].date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{filteredPosts[0].author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{filteredPosts[0].readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{filteredPosts[0].excerpt}</p>
                      <Button asChild>
                        <Link href={`/blog/${filteredPosts[0].slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex gap-2 mb-2">
                          {post.categories.slice(0, 2).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                        <Button variant="outline" size="sm" asChild className="mt-auto">
                          <Link href={`/blog/${post.slug}`}>Read More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-8">
              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span>{category}</span>
                        </div>
                        <Badge variant="outline">
                          {blogPosts.filter((post) => post.categories.includes(category)).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-primary/90 to-primary/70 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-white/90 mb-4">Stay updated with the latest health tips and hospital news.</p>
                  <form className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button variant="secondary" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  readTime: number
  categories: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Heart Health: Tips for a Stronger Heart",
    slug: "understanding-heart-health",
    excerpt:
      "Learn about the latest research on heart health and discover practical tips to keep your heart strong and healthy.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Heart+Health",
    date: "June 15, 2023",
    author: "Dr. Sarah Johnson",
    readTime: 5,
    categories: ["Cardiology", "Wellness", "Prevention"],
  },
  {
    id: "2",
    title: "The Importance of Regular Check-ups for Children",
    slug: "importance-of-regular-checkups-children",
    excerpt:
      "Regular check-ups are crucial for monitoring your child's development and preventing potential health issues.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Children+Checkups",
    date: "May 28, 2023",
    author: "Dr. Emily Rodriguez",
    readTime: 4,
    categories: ["Pediatrics", "Prevention", "Family Health"],
  },
  {
    id: "3",
    title: "Advances in Minimally Invasive Surgery Techniques",
    slug: "advances-minimally-invasive-surgery",
    excerpt: "Discover how minimally invasive surgical techniques are revolutionizing patient care and recovery times.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Surgery+Advances",
    date: "April 12, 2023",
    author: "Dr. James Wilson",
    readTime: 6,
    categories: ["Surgery", "Technology", "Innovation"],
  },
  {
    id: "4",
    title: "Managing Chronic Pain: New Approaches and Treatments",
    slug: "managing-chronic-pain",
    excerpt: "Explore the latest approaches to chronic pain management, from medication to alternative therapies.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Pain+Management",
    date: "March 5, 2023",
    author: "Dr. Lisa Patel",
    readTime: 7,
    categories: ["Pain Management", "Wellness", "Treatments"],
  },
  {
    id: "5",
    title: "Nutrition for Brain Health: Foods That Boost Cognitive Function",
    slug: "nutrition-brain-health",
    excerpt:
      "Learn about the foods and nutrients that can help maintain and improve your brain health and cognitive function.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Brain+Nutrition",
    date: "February 20, 2023",
    author: "Dr. Michael Chen",
    readTime: 5,
    categories: ["Neurology", "Nutrition", "Wellness"],
  },
  {
    id: "6",
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    slug: "understanding-diabetes",
    excerpt:
      "A comprehensive guide to understanding diabetes, its symptoms, causes, and effective management strategies.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Diabetes",
    date: "January 15, 2023",
    author: "Dr. Thomas Brown",
    readTime: 8,
    categories: ["Endocrinology", "Chronic Conditions", "Management"],
  },
  {
    id: "7",
    title: "The Benefits of Regular Exercise for Heart Health",
    slug: "benefits-exercise-heart-health",
    excerpt:
      "Discover how regular physical activity can significantly improve your heart health and reduce the risk of cardiovascular disease.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Exercise+Heart",
    date: "December 10, 2022",
    author: "Dr. Maria Gonzalez",
    readTime: 4,
    categories: ["Cardiology", "Fitness", "Prevention"],
  },
  {
    id: "8",
    title: "Mental Health Awareness: Breaking the Stigma",
    slug: "mental-health-awareness",
    excerpt:
      "An important discussion on mental health awareness and the steps we can take to break the stigma surrounding mental health issues.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Mental+Health",
    date: "November 22, 2022",
    author: "Dr. William Taylor",
    readTime: 6,
    categories: ["Mental Health", "Awareness", "Wellness"],
  },
  {
    id: "9",
    title: "Preventive Healthcare: The Key to Long-term Wellness",
    slug: "preventive-healthcare",
    excerpt:
      "Learn why preventive healthcare is essential for long-term wellness and how regular screenings can detect issues early.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=600&width=800&text=Preventive+Care",
    date: "October 5, 2022",
    author: "Dr. Lisa Patel",
    readTime: 5,
    categories: ["Prevention", "Wellness", "Healthcare"],
  },
]

const categories = [
  "Cardiology",
  "Pediatrics",
  "Surgery",
  "Neurology",
  "Wellness",
  "Prevention",
  "Nutrition",
  "Mental Health",
  "Technology",
  "Innovation",
]

