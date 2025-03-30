import type { Metadata } from "next"
import BlogClient from "./blog-client"

export const metadata: Metadata = {
  title: "Blog & News | Suncare Hospital",
  description:
    "Stay updated with the latest health tips, medical advancements, and hospital news from Suncare Hospital.",
}

export default function BlogPage() {
  return <BlogClient />
}

