"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import type { GalleryImage } from "@/app/gallery/gallery-client"

interface ImageModalProps {
  image: GalleryImage
  onClose: () => void
  galleryImages: GalleryImage[]
}

export function ImageModal({ image, onClose, galleryImages }: ImageModalProps) {
  const [currentImage, setCurrentImage] = useState(image)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Add event listener to close modal on escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto" // Restore scrolling when modal is closed
    }
  }, [currentImage])

  const currentIndex = galleryImages.findIndex((img) => img.id === currentImage.id)

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setCurrentImage(galleryImages[prevIndex])
    resetZoom()
  }

  const handleNext = () => {
    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    setCurrentImage(galleryImages[nextIndex])
    resetZoom()
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1)
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 z-10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        {/* Image container */}
        <div
          className="relative flex-1 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            }}
          >
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              className="object-contain"
              /* 
                Modal image with zoom functionality
                - Using object-contain to show full image within viewport
                - Supports pan and zoom interactions
                - Responsive sizing with fill property
                - Will display high-resolution hospital facility images
              */
            />
          </div>
        </div>

        {/* Caption */}
        <div className="bg-black/50 p-4 text-white">
          <h3 className="text-xl font-medium">{currentImage.title}</h3>
          <p className="text-white/80">{currentImage.description}</p>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>

        {/* Zoom controls */}
        <div className="absolute left-4 bottom-20 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 text-white border-white/20 hover:bg-black/70"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="h-5 w-5" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 text-white border-white/20 hover:bg-black/70"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
          >
            <ZoomIn className="h-5 w-5" />
            <span className="sr-only">Zoom in</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

