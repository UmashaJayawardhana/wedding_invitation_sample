"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Maximize2,
} from "lucide-react";

const photos = [
  {
    src: "/images/wedding1/couple1.jpg",
    alt: "Couple memory 1",
  },
  {
    src: "/images/wedding1/couple2.jpg",
    alt: "Couple memory 2",
  },
  {
    src: "/images/wedding1/couple3.jpg",
    alt: "Couple memory 3",
  },
  {
    src: "/images/wedding1/couple4.jpg",
    alt: "Couple memory 4",
  },
  {
    src: "/images/wedding1/couple5.jpg",
    alt: "Couple memory 5",
  },
  {
    src: "/images/wedding1/couple6.jpg",
    alt: "Couple memory 6",
  },
];

export default function WeddingGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Mobile swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex + 1) % photos.length);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex - 1 + photos.length) % photos.length
    );
  };

  // --------------------------------
  // MOBILE SWIPE
  // --------------------------------

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      return;
    }

    const distance = touchStartX - touchEndX;

    // Minimum swipe distance
    if (Math.abs(distance) < 50) {
      return;
    }

    // Swipe left → next photo
    if (distance > 0) {
      showNext();
    }

    // Swipe right → previous photo
    else {
      showPrevious();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // --------------------------------
  // KEYBOARD NAVIGATION
  // --------------------------------

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      {/* =====================================================
          WEDDING GALLERY SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#fbf7f1] px-6 py-24">

        {/* Background decorative circles */}

        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#d8c3a5] opacity-25" />

        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full border border-[#d8c3a5] opacity-25" />

        {/* =================================================
            TOP LEFT FLOWER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, x: -30, y: -20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute left-4 top-8 md:left-14"
        >
          <Flower2
            size={46}
            strokeWidth={1}
            className="rotate-[-15deg] text-[#c89da5]"
          />

          <Flower2
            size={26}
            strokeWidth={1}
            className="absolute left-10 top-8 text-[#b99572]"
          />
        </motion.div>

        {/* =================================================
            BOTTOM RIGHT FLOWER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute bottom-8 right-4 md:right-14"
        >
          <Flower2
            size={46}
            strokeWidth={1}
            className="rotate-[15deg] text-[#c89da5]"
          />

          <Flower2
            size={26}
            strokeWidth={1}
            className="absolute right-10 top-8 text-[#b99572]"
          />
        </motion.div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* Heading */}

          <div className="text-center">

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.4em] text-[#92795c]"
            >
              Our memories
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              className="mt-4 font-serif text-4xl font-normal text-[#49382d] md:text-5xl"
            >
              Moments We Treasure
            </motion.h2>

            {/* Divider */}

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="mx-auto mt-6 h-px bg-[#b89b72]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
              className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#92795c]"
            >
              A collection of moments, memories and little
              pieces of our journey together.
            </motion.p>

          </div>

          {/* =================================================
              PHOTO GRID
          ================================================= */}

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">

            {/* PHOTO 1 - LARGE */}

            <GalleryPhoto
              photo={photos[0]}
              index={0}
              onClick={() => setSelectedIndex(0)}
              className="col-span-2 row-span-2 h-[420px] md:h-[520px]"
              rounded="rounded-[100px]"
            />

            {/* PHOTO 2 */}

            <GalleryPhoto
              photo={photos[1]}
              index={1}
              onClick={() => setSelectedIndex(1)}
              className="h-[250px]"
              rounded="rounded-[65px]"
            />

            {/* PHOTO 3 */}

            <GalleryPhoto
              photo={photos[2]}
              index={2}
              onClick={() => setSelectedIndex(2)}
              className="h-[250px]"
              rounded="rounded-[65px]"
            />

            {/* PHOTO 4 */}

            <GalleryPhoto
              photo={photos[3]}
              index={3}
              onClick={() => setSelectedIndex(3)}
              className="h-[250px]"
              rounded="rounded-[65px]"
            />

            {/* PHOTO 5 */}

            <GalleryPhoto
              photo={photos[4]}
              index={4}
              onClick={() => setSelectedIndex(4)}
              className="h-[250px]"
              rounded="rounded-[65px]"
            />

            {/* PHOTO 6 - FULL WIDTH */}

            <GalleryPhoto
              photo={photos[5]}
              index={5}
              onClick={() => setSelectedIndex(5)}
              className="col-span-2 h-[300px] md:col-span-4"
              rounded="rounded-[85px]"
            />

          </div>

          {/* =================================================
              GALLERY HINT
          ================================================= */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#92795c]"
          >
            <Maximize2
              size={14}
              strokeWidth={1.2}
            />

            <span className="hidden sm:inline">
              Tap a photo to view
            </span>

            <span className="sm:hidden">
              Tap & swipe to explore
            </span>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          FULLSCREEN LIGHTBOX
      ===================================================== */}

      <AnimatePresence>

        {selectedIndex !== null && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#30251f]/95 px-4"
            onClick={closeGallery}
          >

            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              onClick={closeGallery}
              className="absolute right-5 top-5 z-30 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10"
              aria-label="Close gallery"
            >
              <X
                size={22}
                strokeWidth={1.2}
              />
            </button>

            {/* =================================================
                PHOTO COUNTER
            ================================================= */}

            <div className="absolute left-1/2 top-6 -translate-x-1/2 text-xs tracking-[0.25em] text-white/80">
              {selectedIndex + 1} / {photos.length}
            </div>

            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10 md:left-8"
              aria-label="Previous photo"
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.2}
              />
            </button>

            {/* =================================================
                IMAGE
            ================================================= */}

            <motion.div
              key={selectedIndex}
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
              }}
              transition={{
                duration: 0.35,
              }}
              className="relative max-h-[85vh] max-w-[90vw] touch-pan-y"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >

              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                draggable={false}
                className="max-h-[85vh] max-w-[90vw] rounded-[30px] object-contain shadow-2xl select-none"
              />

            </motion.div>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10 md:right-8"
              aria-label="Next photo"
            >
              <ChevronRight
                size={24}
                strokeWidth={1.2}
              />
            </button>

            {/* =================================================
                MOBILE SWIPE HINT
            ================================================= */}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.25em] text-white/60 sm:hidden">
              Swipe left or right
            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}


/* ============================================================
   GALLERY PHOTO COMPONENT
============================================================ */

interface GalleryPhotoProps {
  photo: {
    src: string;
    alt: string;
  };

  index: number;

  onClick: () => void;

  className: string;

  rounded: string;
}


function GalleryPhoto({
  photo,
  index,
  onClick,
  className,
  rounded,
}: GalleryPhotoProps) {

  return (

    <motion.button
      type="button"

      initial={{
        opacity: 0,
        y: 35,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
      }}

      transition={{
        duration: 0.7,
        delay: index * 0.1,
      }}

      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onClick={onClick}

      className={`group relative overflow-hidden border border-[#c8aa82] bg-[#efe5d7] p-1 text-left ${className} ${rounded}`}
    >

      {/* Photo */}

      <img
        src={photo.src}
        alt={photo.alt}
        draggable={false}
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${rounded}`}
      />

      {/* Hover Overlay */}

      <div
        className={`absolute inset-1 flex items-center justify-center bg-[#49382d]/0 transition-all duration-500 group-hover:bg-[#49382d]/30 ${rounded}`}
      >

        <div className="rounded-full border border-white/70 p-3 text-white opacity-0 transition-all duration-500 group-hover:opacity-100">

          <Maximize2
            size={18}
            strokeWidth={1.2}
          />

        </div>

      </div>

    </motion.button>

  );
}