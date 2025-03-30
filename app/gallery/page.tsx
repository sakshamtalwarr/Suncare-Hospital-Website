import type { Metadata } from "next"
import GalleryClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Gallery | Suncare Hospital",
  description:
    "Explore our state-of-the-art facilities, modern equipment, and dedicated staff through our photo gallery.",
}

export default function GalleryPage() {
  return <GalleryClient />
}

