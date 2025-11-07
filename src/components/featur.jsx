"use client"
import { useEffect, useMemo, useRef, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RotatingText from "./text"
import { useGesture } from "@use-gesture/react"
import { X } from "lucide-react"

import med1 from "../assets/med1.png"
import med2 from "../assets/med2.png"
import med3 from "../assets/med3.png"
import med4 from "../assets/med4.png"
import med5 from "../assets/med5.png"
import med6 from "../assets/med6.png"
import med7 from "../assets/med7.png"
import med8 from "../assets/med8.png"
import med44 from "../assets/med44.png"
import med9 from "../assets/med9.png"
import med10 from "../assets/med10.png"
import med11 from "../assets/med11.png"
import med12 from "../assets/med12.png"
import med13 from "../assets/med13.png"
import med14 from "../assets/over.png"
import med15 from "../assets/adg.png"
import med16 from "../assets/adi.png"
import med17 from "../assets/pres.png"
import med18 from "../assets/sale.png"
import med19 from "../assets/inv.png"
import med55 from "../assets/med55.png"
import med66 from "../assets/med66.png"
import med77 from "../assets/med77.png"
import med88 from "../assets/med88.png"
import med99 from "../assets/med99.png"

const DEFAULT_IMAGES = [
  { type: "image", src: med2 },
  { type: "image", src: med10 },
  { type: "image", src: med9 },
  { type: "image", src: med3 },
  { type: "image", src: med4 },
  { type: "image", src: med88 },
  { type: "image", src: med12 },
  { type: "image", src: med14 },
  { type: "image", src: med17 },
  { type: "image", src: med18 },
  { type: "image", src: med19 },
  { type: "image", src: med44 },
  { type: "image", src: med55 },
  { type: "image", src: med66 },
  { type: "image", src: med77 },
  { type: "image", src: med99 },
  { type: "image", src: med15 },
  { type: "image", src: med16 },
  { type: "image", src: med8 },
  { type: "image", src: med13 },
  { type: "image", src: med5 },
  { type: "image", src: med6 },
  { type: "image", src: med1 },
  { type: "image", src: med7 },
  { type: "image", src: med11 },
]

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
}

// --- Helper Functions ---
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const normalizeAngle = (d) => ((d % 360) + 360) % 360
const wrapAngleSigned = (deg) => {
  const a = (((deg + 180) % 360) + 360) % 360
  return a - 180
}

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
  })

  const totalSlots = coords.length
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }))
  }
  if (pool.length > totalSlots) {
    console.warn(`[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}).`)
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "" }
    }
    return { src: image.src || "", alt: image.alt || "" }
  })

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length])

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]
          usedImages[i] = usedImages[j]
          usedImages[j] = tmp
          break
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }))
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2
  const rotateY = unit * (offsetX + (sizeX - 1) / 2)
  const rotateX = unit * (offsetY - (sizeY - 1) / 2)
  return { rotateX, rotateY }
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 240,
  maxRadius = Number.POSITIVE_INFINITY,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "400px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
}) {
  // --- STATE AND REFS ---
  const rootRef = useRef(null)
  const mainRef = useRef(null)
  const sphereRef = useRef(null)

  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef(null)
  const draggingRef = useRef(false)
  const cancelTapRef = useRef(false)
  const movedRef = useRef(false)
  const inertiaRAF = useRef(null)
  const pointerTypeRef = useRef("mouse")
  const tapTargetRef = useRef(null)
  const hoverRef = useRef(false)
  const autoRotateRAF = useRef(null)

  const savedScrollPosRef = useRef({ x: 0, y: 0 })

  const [selectedImage, setSelectedImage] = useState(null)

  const scrollLockedRef = useRef(false)

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return
    scrollLockedRef.current = true

    // Save current scroll position
    savedScrollPosRef.current = {
      x: window.scrollX,
      y: window.scrollY,
    }

    // Apply lock with overflow hidden instead of position fixed
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.documentElement.style.touchAction = "none"
    document.body.style.touchAction = "none"
  }, [])

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return
    if (selectedImage) return
    scrollLockedRef.current = false

    // Remove lock
    document.documentElement.style.overflow = ""
    document.body.style.overflow = ""
    document.documentElement.style.touchAction = ""
    document.body.style.touchAction = ""
  }, [selectedImage])

  const items = useMemo(() => buildItems(images, segments), [images, segments])

  const applyTransform = useCallback((xDeg, yDeg) => {
    const el = sphereRef.current
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
    }
  }, [])

  const lockedRadiusRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height)
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h

      let basis
      switch (fitBasis) {
        case "min":
          basis = minDim
          break
        case "max":
          basis = maxDim
          break
        case "width":
          basis = w
          break
        case "height":
          basis = h
          break
        default:
          basis = aspect >= 1.3 ? w : minDim
      }

      let radius = basis * fit
      const heightGuard = h * 1.35
      radius = Math.min(radius, heightGuard)

      const currentMinRadius = window.innerWidth < 640 ? 180 : window.innerWidth < 1024 ? 240 : minRadius

      radius = clamp(radius, currentMinRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)

      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`)
      root.style.setProperty("--viewer-pad", `${viewerPad}px`)
      root.style.setProperty("--overlay-blur-color", overlayBlurColor)
      root.style.setProperty("--tile-radius", imageBorderRadius)
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius)

      applyTransform(rotationRef.current.x, rotationRef.current.y)
    })

    ro.observe(root)
    return () => {
      ro.disconnect()
    }
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    imageBorderRadius,
    openedImageBorderRadius,
    applyTransform,
  ])

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y)
  }, [applyTransform])

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current !== null) {
      cancelAnimationFrame(inertiaRAF.current)
      inertiaRAF.current = null
    }
  }, [])

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRAF.current !== null) {
      cancelAnimationFrame(autoRotateRAF.current)
      autoRotateRAF.current = null
    }
  }, [])

  const startAutoRotate = useCallback(() => {
    stopAutoRotate()
    const step = (timestamp) => {
      // Don't rotate if modal open, dragging, or hovering
      if (draggingRef.current || selectedImage || hoverRef.current) {
        autoRotateRAF.current = requestAnimationFrame(step)
        return
      }

      const nextY = wrapAngleSigned(rotationRef.current.y + 0.035)
      rotationRef.current = { x: rotationRef.current.x, y: nextY }
      applyTransform(rotationRef.current.x, nextY)

      autoRotateRAF.current = requestAnimationFrame(step)
    }
    autoRotateRAF.current = requestAnimationFrame(step)
  }, [stopAutoRotate, selectedImage, applyTransform])

  useEffect(() => {
    startAutoRotate()
    return () => stopAutoRotate()
  }, [startAutoRotate, stopAutoRotate])

  const startInertia = useCallback(
    (vx, vy) => {
      stopAutoRotate()
      const MAX_V = 1.4
      let vX = clamp(vx, -MAX_V, MAX_V) * 80
      let vY = clamp(vy, -MAX_V, MAX_V) * 80
      let frames = 0
      const d = clamp(dragDampening ?? 0.6, 0, 1)
      const frictionMul = 0.94 + 0.055 * d
      const stopThreshold = 0.015 - 0.01 * d
      const maxFrames = Math.round(90 + 270 * d)

      const step = () => {
        vX *= frictionMul
        vY *= frictionMul

        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null
          if (!hoverRef.current && !selectedImage) startAutoRotate()
          return
        }

        if (++frames > maxFrames) {
          inertiaRAF.current = null
          if (!hoverRef.current && !selectedImage) startAutoRotate()
          return
        }

        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)

        inertiaRAF.current = requestAnimationFrame(step)
      }

      stopInertia()
      inertiaRAF.current = requestAnimationFrame(step)
    },
    [
      dragDampening,
      maxVerticalRotationDeg,
      stopInertia,
      stopAutoRotate,
      startAutoRotate,
      selectedImage,
      applyTransform,
    ],
  )

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (selectedImage || !mainRef.current?.contains(event.target)) return

        stopInertia()
        stopAutoRotate()

        pointerTypeRef.current = event.pointerType || "mouse"
        draggingRef.current = true
        cancelTapRef.current = false
        movedRef.current = false
        startRotRef.current = { ...rotationRef.current }
        startPosRef.current = { x: event.clientX, y: event.clientY }

        const potential = event.target.closest?.(".item__image")
        tapTargetRef.current = potential || null

        // Only lock scroll for touch events
        if (pointerTypeRef.current === "touch") {
          event.preventDefault()
          lockScroll()
        }
      },

      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (selectedImage || !draggingRef.current || !startPosRef.current) return

        if (pointerTypeRef.current === "touch") {
          event.preventDefault()
        }

        const dxTotal = event.clientX - startPosRef.current.x
        const dyTotal = event.clientY - startPosRef.current.y

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal
          if (dist2 > 16) movedRef.current = true
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        )
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity

        const cur = rotationRef.current
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY }
          applyTransform(nextX, nextY)
        }

        if (last) {
          draggingRef.current = false

          let isTap = false
          if (startPosRef.current) {
            const dx = event.clientX - startPosRef.current.x
            const dy = event.clientY - startPosRef.current.y
            const dist2 = dx * dx + dy * dy
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true
            }
          }

          const [vMagX, vMagY] = velArr
          const [dirX, dirY] = dirArr
          let vx = vMagX * dirX
          let vy = vMagY * dirY

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement
            vx = (mx / dragSensitivity) * 0.02
            vy = (my / dragSensitivity) * 0.02
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy)
          } else if (!hoverRef.current && !selectedImage) {
            startAutoRotate()
          }

          startPosRef.current = null
          cancelTapRef.current = !isTap

          if (isTap && tapTargetRef.current && !selectedImage && !movedRef.current) {
            const img = tapTargetRef.current.querySelector("img")
            if (img?.src) {
              setSelectedImage(img.src)
            }
          }
          tapTargetRef.current = null

          if (cancelTapRef.current) {
            setTimeout(() => (cancelTapRef.current = false), 120)
          }

          movedRef.current = false

          if (pointerTypeRef.current === "touch") {
            unlockScroll()
          }
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: true })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      // Clean up all overflows on unmount
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      document.documentElement.style.touchAction = ""
      document.body.style.touchAction = ""
      stopInertia()
      stopAutoRotate()
    }
  }, [selectedImage, stopInertia, stopAutoRotate])

  useEffect(() => {
    if (selectedImage) {
      lockScroll()
      stopAutoRotate()
    } else {
      unlockScroll()
      if (!draggingRef.current && !hoverRef.current) {
        startAutoRotate()
      }
    }
  }, [selectedImage, lockScroll, unlockScroll, stopAutoRotate, startAutoRotate])

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * {
      box-sizing: border-box;
    }

    .sphere, .sphere-item, .item__image {
      transform-style: preserve-3d;
    }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                translateZ(var(--radius));
    }

    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      pointer-events: auto;
      will-change: transform;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }

    .item__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }

    @media (max-width: 640px) {
      .sphere-root {
        --radius: 340px !important;
      }
      .item__image {
        inset: 6px !important;
        border-radius: 14px !important;
      }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div
        ref={rootRef}
        className="sphere-root relative w-full h-screen bg-gradient-to-br from-cyan-200/70 via-gray-400 to-cyan-200/70"
        style={{
          ["--segments-x"]: segments,
          ["--segments-y"]: segments,
          ["--overlay-blur-color"]: overlayBlurColor,
          ["--tile-radius"]: imageBorderRadius,
          ["--enlarge-radius"]: openedImageBorderRadius,
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            opacity: { duration: 15, repeat: Number.POSITIVE_INFINITY },
          }}
          className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-cyan-200/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: -360,
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            rotate: { duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            opacity: { duration: 20, repeat: Number.POSITIVE_INFINITY, delay: 3 },
          }}
          className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-tl from-cyan-200/30 to-blue-200/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: ["-100%", "100%"],
            y: ["-10%", "0%", "10%", "0%", "-10%"],
          }}
          transition={{
            x: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            y: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-0 w-[200%] h-32 transform -translate-y-1/2 
                       bg-gradient-to-r from-transparent via-cyan-900/70 to-transparent 
                       opacity-50 blur-xl"
        />

        <motion.div
          className="
    w-full xl:w-1/2 m-5
    pr-0 xl:pr-8 
    z-20 
    text-left 
    pt-24 pb-4 xl:pt-0 xl:pb-0 
    xl:flex xl:flex-col xl:justify-center
  "
          style={{
            display: window.innerWidth < 1600 ? "block" : "none",
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-xl mb-6 sm:mb-9">
            Medrox All‑in‑One
          </h1>

          <div className="text-lg sm:text-xl xl:text-2xl text-cyan-100/80 min-h-[90px] sm:min-h-[100px] xl:h-24">
            <RotatingText
              texts={[
                "Supporting over 60+ specialists workflows",
                "Experience the future of healthcare today.",
                "Experience the future of full Pharmacy Management today.",
                "Full Owner admin control with AI-Driven Handler.",
                "All-in-one seamless pharmacy & healthcare system.",
                "Designed with care. Built for performance.",
                "Efficient. Secure. Broad. The next generation of Healthcare.",
                "More than 30+ Features in each platform.",
              ]}
            />
          </div>
        </motion.div>

        <main
          ref={mainRef}
          className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-12 overflow-hidden select-none bg-transparent"
          style={{
            touchAction: "manipulation",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <motion.div
            className="
    hidden xl:block
    w-full xl:w-1/2 
    pr-0 xl:pr-8 
    z-20 
    text-left 
    pt-24 pb-4 xl:pt-0 xl:pb-0 
    xl:flex xl:flex-col xl:justify-center
  "
            style={{
              display: window.innerWidth >= 1600 ? "block" : "none",
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-xl mb-6 sm:mb-9">
              Medrox All‑in‑One
            </h1>

            <div className="text-lg sm:text-xl xl:text-2xl text-cyan-100/80 min-h-[90px] sm:min-h-[100px] xl:h-24">
              <RotatingText
                texts={[
                  "Supporting over 60+ specialists workflows",
                  "Experience the future of healthcare today.",
                  "Experience the future of full Pharmacy Management today.",
                  "Full Owner admin control with AI-Driven Handler.",
                  "All-in-one seamless pharmacy & healthcare system.",
                  "Designed with care. Built for performance.",
                  "Efficient. Secure. Broad. The next generation of Healthcare.",
                  "More than 30+ Features in each platform.",
                ]}
              />
            </div>
          </motion.div>

          <div className="stage w-full lg:w-1/2 flex-1 min-h-0 flex items-center justify-center">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  style={{
                    ["--offset-x"]: it.x,
                    ["--offset-y"]: it.y,
                    ["--item-size-x"]: it.sizeX,
                    ["--item-size-y"]: it.sizeY,
                    top: "-999px",
                    bottom: "-999px",
                    left: "-999px",
                    right: "-999px",
                  }}
                >
                  <motion.div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-900/50"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onPointerEnter={() => {
                      if (!draggingRef.current) hoverRef.current = true
                    }}
                    onPointerLeave={() => {
                      hoverRef.current = false
                      if (!draggingRef.current && !selectedImage) startAutoRotate()
                    }}
                    onClick={() => {
                      if (movedRef.current || cancelTapRef.current) return
                      setSelectedImage(it.src)
                    }}
                    whileHover={{
                      scale: 1.2,
                      zIndex: 10,
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    }}
                    style={{
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={it.src || "/placeholder.svg"}
                      draggable={false}
                      alt={it.alt}
                      style={{ backfaceVisibility: "hidden" }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            style={{ pointerEvents: "auto" }}
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelectedImage(null)}
              style={{ pointerEvents: "auto" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.2, type: "spring", damping: 25 }}
              className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
            >
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Expanded view"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                draggable={false}
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-300"
                type="button"
              >
                <X size={28} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
