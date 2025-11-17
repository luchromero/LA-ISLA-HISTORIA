"use client"

import { useRef, useEffect } from "react"
import "./VideoScroll.css"

export default function VideoScroll() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        const containerTop = containerRect.top
        const containerBottom = containerRect.bottom

        let progress = 0

        if (containerTop < windowHeight && containerBottom > 0) {
          const visibleHeight = Math.min(windowHeight, containerBottom) - Math.max(0, containerTop)
          const totalScrollDistance = windowHeight + containerRect.height
          const scrolled = windowHeight - containerTop
          progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance))
        }

        const startPosition = -100
        const endPosition = 200
        const currentPosition = startPosition + progress * (endPosition - startPosition)

        videoRef.current.style.transform = `translateX(${currentPosition}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="video-section-container" ref={containerRef}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/AdobeStock_552616169_Video_HD_Preview.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>
    </div>
  )
}
