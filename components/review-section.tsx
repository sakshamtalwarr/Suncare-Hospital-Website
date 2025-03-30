"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Star, StarHalf, User, MessageSquare, ThumbsUp } from "lucide-react"

interface ReviewSectionProps {
  reviews?: Review[]
}

export function ReviewSection({ reviews: initialReviews = defaultReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    email: "",
    rating: 5,
    title: "",
    comment: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    // Add new review to the list
    const currentDate = new Date()
    const formattedDate = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`

    const newReviewItem: Review = {
      id: `review-${reviews.length + 1}`,
      name: newReview.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: formattedDate,
      helpful: 0,
      verified: false,
    }

    setReviews((prev) => [newReviewItem, ...prev])

    // Reset form and close dialog
    setNewReview({
      name: "",
      email: "",
      rating: 5,
      title: "",
      comment: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your feedback!",
    })
  }

  const handleHelpfulClick = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )

    toast({
      description: "Thanks for your feedback!",
    })
  }

  // Filter reviews based on active tab
  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "all") return true
    if (activeTab === "positive") return review.rating >= 4
    if (activeTab === "neutral") return review.rating === 3
    if (activeTab === "negative") return review.rating <= 2
    return true
  })

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => Math.floor(review.rating) === rating).length
    const percentage = (count / reviews.length) * 100
    return { rating, count, percentage }
  })

  return (
    <section className="py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Patient Reviews</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
            See what our patients have to say about their experience at Suncare Hospital
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= Math.floor(averageRating) ? (
                        <Star className="h-5 w-5 fill-primary text-primary" />
                      ) : star - 0.5 <= averageRating ? (
                        <StarHalf className="h-5 w-5 fill-primary text-primary" />
                      ) : (
                        <Star className="h-5 w-5 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">Based on {reviews.length} reviews</p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Write a Review</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Share Your Experience</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={newReview.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={newReview.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleRatingChange(rating)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  rating <= newReview.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Review Title</Label>
                        <Input id="title" name="title" value={newReview.title} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          name="comment"
                          rows={4}
                          value={newReview.comment}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Submit Review
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-8 space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{rating} stars</div>
                    <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="w-8 text-sm text-right">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="positive">Positive</TabsTrigger>
                  <TabsTrigger value="neutral">Neutral</TabsTrigger>
                  <TabsTrigger value="negative">Negative</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {review.name}
                                {review.verified && (
                                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full">
                                    Verified Patient
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground mb-4">{review.comment}</p>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => handleHelpfulClick(review.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Helpful ({review.helpful})
                          </Button>

                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews in this category yet.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

interface Review {
  id: string
  name: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
}

interface NewReview {
  name: string
  email: string
  rating: number
  title: string
  comment: string
}

const defaultReviews: Review[] = [
  {
    id: "review-1",
    name: "Sarah Johnson",
    rating: 5,
    title: "Exceptional Care and Attention",
    comment:
      "I recently had surgery at Suncare Hospital and was amazed by the level of care I received. The doctors were knowledgeable and took the time to explain everything to me. The nursing staff was attentive and compassionate. The facility itself was clean and modern. I couldn't have asked for a better experience during a stressful time.",
    date: "June 15, 2023",
    helpful: 24,
    verified: true,
  },
  {
    id: "review-2",
    name: "Michael Thompson",
    rating: 4,
    title: "Professional and Efficient Service",
    comment:
      "My experience at Suncare Hospital was very positive. The staff was professional and efficient, and I didn't have to wait long for my appointment. The doctor was thorough and addressed all my concerns. The only reason I'm not giving 5 stars is because the parking situation could be improved.",
    date: "May 28, 2023",
    helpful: 12,
    verified: true,
  },
  {
    id: "review-3",
    name: "Emily Rodriguez",
    rating: 5,
    title: "Outstanding Pediatric Care",
    comment:
      "I've been bringing my children to Suncare Hospital for years, and we've always received excellent care. The pediatric department is especially wonderful with children, making what could be scary visits much more comfortable. The doctors are patient and take the time to answer all my questions.",
    date: "April 12, 2023",
    helpful: 18,
    verified: true,
  },
  {
    id: "review-4",
    name: "David Wilson",
    rating: 3,
    title: "Good Care but Long Wait Times",
    comment:
      "The medical care at Suncare Hospital is good, but the wait times can be frustrating. I had to wait over an hour past my scheduled appointment time. The staff was apologetic and the doctor was thorough once I was seen, but they should work on their scheduling efficiency.",
    date: "March 5, 2023",
    helpful: 8,
    verified: false,
  },
  {
    id: "review-5",
    name: "Jennifer Lee",
    rating: 5,
    title: "Life-Saving Emergency Care",
    comment:
      "I can't thank the emergency department at Suncare Hospital enough. When I arrived with severe chest pain, they immediately took me in and provided life-saving care. The doctors and nurses were not only highly skilled but also compassionate and reassuring during a frightening time.",
    date: "February 20, 2023",
    helpful: 32,
    verified: true,
  },
  {
    id: "review-6",
    name: "Robert Chen",
    rating: 2,
    title: "Billing Issues Overshadowed Care",
    comment:
      "While the medical care was adequate, I've had ongoing issues with billing that have been frustrating to resolve. Multiple incorrect charges and difficulty reaching the billing department have overshadowed what would otherwise have been a positive experience.",
    date: "January 15, 2023",
    helpful: 6,
    verified: false,
  },
]

