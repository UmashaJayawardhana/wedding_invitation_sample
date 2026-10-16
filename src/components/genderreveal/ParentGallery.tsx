"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Heart,
  Sparkles,
} from "lucide-react";

const photos = [
  "/images/genderreveal/parent(1).jpeg",
  "/images/genderreveal/parent(2).jpeg",
  "/images/genderreveal/parent(3).jpeg",
  "/images/genderreveal/parent(4).jpeg",
  "/images/genderreveal/parent(5).jpeg",
  "/images/genderreveal/parent(6).jpeg",
  "/images/genderreveal/parent(7).jpeg",
  "/images/genderreveal/parent(8).jpeg",
];

interface PhotoCardProps {
  src: string;
  index: number;
  className?: string;
  onClick: () => void;
}

function PhotoCard({
  src,
  index,
  className = "",
  onClick,
}: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
      }}
      whileHover={{ y: -6 }}
      className={`group relative cursor-pointer overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-lg ${className}`}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`Pregnancy moment ${index + 1}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Zoom icon */}
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#7d6a5e] opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
        <Maximize2 size={17} />
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#7d6a5e] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
        <Heart size={12} fill="currentColor" />
        Moment {index + 1}
      </div>
    </motion.div>
  );
}

export default function ParentGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closePhoto = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#fffaf7] px-5 py-20 sm:px-8 md:px-12 lg:px-20">
        {/* Background blue glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#bfe8f7] blur-3xl"
        />

        {/* Background pink glow */}
        <motion.div
          animate={{
            scale: [1.08, 1, 1.08],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-[#f7c9da] blur-3xl"
        />

        {/* Floating hearts */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[15%] text-3xl text-[#8bcbe7] sm:text-4xl"
        >
          ♥
        </motion.div>

        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [8, -8, 8],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[6%] top-[25%] text-3xl text-[#e9a7bf] sm:text-4xl"
        >
          ♥
        </motion.div>

        {/* Pink bow */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] bottom-[20%] text-3xl sm:text-4xl"
        >
          🎀
        </motion.div>

        {/* Blue bow */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] bottom-[15%] text-3xl sm:text-4xl"
        >
          🩵
        </motion.div>

        {/* Sparkles */}
        <Sparkles
          className="absolute left-[15%] top-[35%] text-[#b6ddec]"
          size={22}
        />

        <Sparkles
          className="absolute right-[15%] top-[45%] text-[#efb6cb]"
          size={22}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            {/* Small decoration */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="text-xl">💙</span>

              <div className="h-px w-12 bg-[#b9ddeb] sm:w-20" />

              <span className="text-2xl">🎀</span>

              <div className="h-px w-12 bg-[#edbfd0] sm:w-20" />

              <span className="text-xl">💗</span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9a8477]">
              Our Beautiful Journey
            </p>

            <h2 className="font-serif text-4xl text-[#514238] sm:text-5xl md:text-6xl">
              A Little Journey
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#806f65] sm:text-base">
              From two hearts to a family of three, here are a few beautiful
              moments from this precious journey.
            </p>
          </motion.div>

          {/* ========================= */}
          {/* DESKTOP GALLERY */}
          {/* ========================= */}

          <div className="hidden md:grid md:grid-cols-4 md:auto-rows-[190px] md:gap-5">
            {/* Photo 1 - Large */}
            <PhotoCard
              src={photos[0]}
              index={0}
              onClick={() => openPhoto(0)}
              className="md:col-span-2 md:row-span-2"
            />

            {/* Photo 2 */}
            <PhotoCard
              src={photos[1]}
              index={1}
              onClick={() => openPhoto(1)}
            />

            {/* Photo 3 */}
            <PhotoCard
              src={photos[2]}
              index={2}
              onClick={() => openPhoto(2)}
            />

            {/* Photo 4 */}
            <PhotoCard
              src={photos[3]}
              index={3}
              onClick={() => openPhoto(3)}
            />

            {/* Photo 5 */}
            <PhotoCard
              src={photos[4]}
              index={4}
              onClick={() => openPhoto(4)}
            />

            {/* Photo 6 */}
            <PhotoCard
              src={photos[5]}
              index={5}
              onClick={() => openPhoto(5)}
              className="md:col-span-2"
            />

            {/* Photo 7 */}
            <PhotoCard
              src={photos[6]}
              index={6}
              onClick={() => openPhoto(6)}
              className="md:col-span-2"
            />

            {/* Photo 8 */}
            <PhotoCard
              src={photos[7]}
              index={7}
              onClick={() => openPhoto(7)}
              className="md:col-span-4 md:h-[300px]"
            />
          </div>

          {/* ========================= */}
          {/* MOBILE GALLERY */}
          {/* ========================= */}

          <div className="grid grid-cols-2 gap-3 md:hidden">
            {/* Photo 1 - Large */}
            <PhotoCard
              src={photos[0]}
              index={0}
              onClick={() => openPhoto(0)}
              className="col-span-2 h-[330px]"
            />

            {/* Photo 2 */}
            <PhotoCard
              src={photos[1]}
              index={1}
              onClick={() => openPhoto(1)}
              className="h-[210px]"
            />

            {/* Photo 3 */}
            <PhotoCard
              src={photos[2]}
              index={2}
              onClick={() => openPhoto(2)}
              className="h-[210px]"
            />

            {/* Photo 4 */}
            <PhotoCard
              src={photos[3]}
              index={3}
              onClick={() => openPhoto(3)}
              className="h-[210px]"
            />

            {/* Photo 5 */}
            <PhotoCard
              src={photos[4]}
              index={4}
              onClick={() => openPhoto(4)}
              className="h-[210px]"
            />

            {/* Photo 6 */}
            <PhotoCard
              src={photos[5]}
              index={5}
              onClick={() => openPhoto(5)}
              className="col-span-2 h-[260px]"
            />

            {/* Photo 7 */}
            <PhotoCard
              src={photos[6]}
              index={6}
              onClick={() => openPhoto(6)}
              className="col-span-2 h-[260px]"
            />

            {/* Photo 8 */}
            <PhotoCard
              src={photos[7]}
              index={7}
              onClick={() => openPhoto(7)}
              className="col-span-2 h-[300px]"
            />
          </div>

          {/* ================================= */}
          {/* BOTTOM DECORATION */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-30 mt-14 flex items-center justify-center gap-3 text-xl sm:mt-16 sm:gap-5 sm:text-2xl"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💙
            </motion.span>

            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              🌸
            </motion.span>

            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              🎀
            </motion.span>

            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.span>

            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              🎀
            </motion.span>

            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              🌸
            </motion.span>

            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💗
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-30 mt-5 text-center font-serif text-sm italic text-[#7d6a5e] sm:text-base"
          >

          </motion.p>

          <p className="mt-5 text-center font-serif text-sm italic text-[#9a8477]">
            Every picture holds a little piece of our happiness.
          </p>
        </div>
      </section>

      {/* ===================================== */}
      {/* FULLSCREEN PHOTO VIEWER / LIGHTBOX */}
      {/* ===================================== */}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closePhoto}
          >
            {/* Close Button */}
            <button
              onClick={closePhoto}
              className="absolute right-4 top-4 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-7 sm:top-7"
              aria-label="Close gallery"
            >
              <X size={23} />
            </button>

            {/* Photo Counter */}
            <div className="absolute left-1/2 top-5 z-[110] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-md sm:top-7">
              {selectedIndex + 1} / {photos.length}
            </div>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6 sm:h-14 sm:w-14"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6 sm:h-14 sm:w-14"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-[88vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex]}
                alt={`Pregnancy moment ${selectedIndex + 1}`}
                className="max-h-[85vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
              />
            </motion.div>

            {/* Bottom hearts */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 text-lg">
              <span className="text-[#9dd7ed]">💙</span>
              <span className="text-white/70">✨</span>
              <span className="text-[#efb4ca]">🎀</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}