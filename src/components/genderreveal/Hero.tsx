"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  parentOne?: string;
  parentTwo?: string;
}

export default function Hero({
  parentOne = "Kasun",
  parentTwo = "Amaya",
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#faf7f3]">
      {/* Background Image */}
      <div className="absolute inset-0 md:left-[28%] md:right-[28%] w-full h-full md:w-auto">
        <img
          src="/images/genderreveal/hreobg.png"
          alt="Gender reveal invitation background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/* =========================
          BLUE GLOW
      ========================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -left-40 top-[-80px] h-[550px] w-[550px] rounded-full bg-[#a9daf1] blur-3xl"
      />

      {/* =========================
          PINK GLOW
      ========================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -right-40 bottom-[-80px] h-[550px] w-[550px] rounded-full bg-[#f1bfd3] blur-3xl"
      />

      {/* =========================
          BOY IMAGE - LEFT TOP
      ========================= */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          x: { duration: 1, delay: 0.4 },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          absolute
          left-3 top-16
          z-10
          sm:left-10 sm:top-20
          md:left-16 md:top-24
        "
      >
        <div
          className="
            relative
            h-24 w-24
            overflow-hidden
            rounded-full
            border-4 border-white
            bg-[#e7f5fc]
            shadow-lg
            sm:h-32 sm:w-32
            md:h-40 md:w-40
          "
        >
          <img
            src="/images/genderreveal/boyimage1.jpg"
            alt="Baby boy"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Blue label */}
        <div
          className="
            absolute -bottom-2 left-1/2
            -translate-x-1/2
            rounded-full
            border border-[#b9dff1]
            bg-white/90
            px-3 py-1
            text-[9px]
            font-semibold
            tracking-wider
            text-[#568daf]
            shadow-sm
            sm:px-4 sm:py-1.5
            sm:text-[10px]
          "
        >
          BOY 💙
        </div>
      </motion.div>

      {/* =========================
          GIRL IMAGE - RIGHT TOP
      ========================= */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          x: { duration: 1, delay: 0.6 },
          y: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          absolute
          right-3 top-16
          z-10
          sm:right-10 sm:top-20
          md:right-16 md:top-24
        "
      >
        <div
          className="
            relative
            h-24 w-24
            overflow-hidden
            rounded-full
            border-4 border-white
            bg-[#ffedf3]
            shadow-lg
            sm:h-32 sm:w-32
            md:h-40 md:w-40
          "
        >
          <img
            src="/images/genderreveal/girlimage1.jpg"
            alt="Baby girl"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Pink label */}
        <div
          className="
            absolute -bottom-2 left-1/2
            -translate-x-1/2
            rounded-full
            border border-[#f0c4d5]
            bg-white/90
            px-3 py-1
            text-[9px]
            font-semibold
            tracking-wider
            text-[#b56f8c]
            shadow-sm
            sm:px-4 sm:py-1.5
            sm:text-[10px]
          "
        >
          GIRL 🎀
        </div>
      </motion.div>

      {/* =========================
          FLOATING DECORATIONS
      ========================= */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute left-[4%] top-[42%]
          text-5xl
          sm:text-6xl
        "
      >
        🎈
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute right-[4%] top-[44%]
          text-5xl
          sm:text-6xl
        "
      >
        🎈
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute left-[20%] top-[27%] text-xl text-[#69a9cd]"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[20%] top-[30%] text-xl text-[#d88ca6]"
      >
        ✦
      </motion.div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 py-16">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-3xl text-center"
        >

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#9ec9df] sm:w-12" />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8b7355] sm:text-xs sm:tracking-[0.3em]">
              We're Expecting
            </span>

            <span className="h-px w-10 bg-[#e0a5ba] sm:w-12" />
          </motion.div>

          {/* Baby icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-5 text-5xl sm:text-6xl"
          >
            👶
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="
              font-serif
              text-5xl
              leading-tight
              text-[#514238]
              sm:text-7xl
              md:text-8xl
            "
          >
            He or She?
          </motion.h1>

          {/* Question */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="
              mt-5
              text-sm
              tracking-wide
              text-[#75685d]
              sm:text-lg
            "
          >
            We can't wait to share the surprise with you!
          </motion.p>

          {/* Parent names */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-7 sm:mt-8"
          >
            <p className="font-serif text-2xl text-[#514238] sm:text-3xl">
              {parentOne}
              <span className="mx-3 text-[#c990a7]">&</span>
              {parentTwo}
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#a08d7d] sm:text-xs sm:tracking-[0.3em]">
              are becoming parents
            </p>
          </motion.div>

          {/* Boy / Girl line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 sm:mt-10 sm:gap-5"
          >
            <div className="rounded-full border border-[#b9dff1] bg-[#e7f5fc] px-4 py-2 sm:px-6 sm:py-3">
              <span className="text-xs font-medium tracking-wider text-[#568daf] sm:text-sm">
                💙 BOY
              </span>
            </div>

            <Sparkles
              size={16}
              strokeWidth={1.5}
              className="text-[#9a8069] sm:h-[18px] sm:w-[18px]"
            />

            <div className="rounded-full border border-[#f0c4d5] bg-[#ffedf3] px-4 py-2 sm:px-6 sm:py-3">
              <span className="text-xs font-medium tracking-wider text-[#b56f8c] sm:text-sm">
                GIRL 🎀
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center text-[#9a8069]"
        >
          <span className="mb-1 text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>

          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

    </section>
  );
}