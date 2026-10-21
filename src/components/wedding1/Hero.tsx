"use client";

import { motion } from "framer-motion";
import { ChevronDown, Flower2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f1e8]">

      {/* ========================================
          CENTRAL BACKGROUND VIDEO
          ======================================== */}

      <div className="absolute inset-y-0 left-4 right-4 overflow-hidden rounded-none md:left-[4in] md:right-[4in]">

        {/* Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        >
          <source
            src="/videos/wedding1/herobg.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 block h-full w-full object-cover md:hidden"
        >
          <source
            src="/videos/herobg.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#f7f1e8]/55" />

      </div>


      {/* ========================================
          BACKGROUND DECORATIVE CIRCLES
          ======================================== */}

      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#d8c3a5] opacity-40" />

      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full border border-[#d8c3a5] opacity-40" />


      {/* ========================================
          TOP-LEFT FLORAL DECORATION
          ======================================== */}

      <motion.div
        initial={{ opacity: 0, x: -30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-3 top-5 md:left-12 md:top-10"
      >
        <div className="relative h-40 w-32 rotate-[-15deg]">

          {/* Stem */}
          <div className="absolute left-12 top-8 h-32 w-[1px] rotate-[-25deg] bg-[#9b8060]" />

          {/* Flowers */}
          <div className="absolute left-2 top-3 text-[#c89da5]">
            <Flower2 size={38} strokeWidth={1} />
          </div>

          <div className="absolute left-16 top-1 text-[#b99572]">
            <Flower2 size={28} strokeWidth={1} />
          </div>

          {/* Leaves */}
          <span className="absolute left-7 top-20 h-5 w-10 rotate-[-35deg] rounded-full border border-[#9b9a78]" />

          <span className="absolute left-14 top-24 h-5 w-10 rotate-[35deg] rounded-full border border-[#9b9a78]" />

        </div>
      </motion.div>


      {/* ========================================
          TOP-RIGHT FLORAL DECORATION
          ======================================== */}

      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute right-3 top-8 md:right-12 md:top-12"
      >
        <div className="relative h-40 w-32 rotate-[15deg]">

          {/* Stem */}
          <div className="absolute right-12 top-8 h-32 w-[1px] rotate-[25deg] bg-[#9b8060]" />

          {/* Flowers */}
          <div className="absolute right-2 top-3 text-[#c89da5]">
            <Flower2 size={38} strokeWidth={1} />
          </div>

          <div className="absolute right-16 top-1 text-[#b99572]">
            <Flower2 size={28} strokeWidth={1} />
          </div>

          {/* Leaves */}
          <span className="absolute right-7 top-20 h-5 w-10 rotate-[35deg] rounded-full border border-[#9b9a78]" />

          <span className="absolute right-14 top-24 h-5 w-10 rotate-[-35deg] rounded-full border border-[#9b9a78]" />

        </div>
      </motion.div>


      {/* ========================================
          FLOATING PETALS
          ======================================== */}

      <motion.span
        animate={{
          y: [0, 15, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute left-[15%] top-[35%] h-3 w-2 rotate-45 rounded-full bg-[#d8aeb5] opacity-60"
      />

      <motion.span
        animate={{
          y: [0, -12, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
        className="absolute right-[17%] top-[42%] h-3 w-2 -rotate-12 rounded-full bg-[#c9a47c] opacity-60"
      />

      <motion.span
        animate={{
          y: [0, 12, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
        className="absolute bottom-[30%] left-[20%] h-2 w-2 rotate-45 rounded-full bg-[#d8aeb5] opacity-50"
      />


      {/* ========================================
          MAIN CONTENT
          ======================================== */}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center">

        {/* Small heading */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.45em] text-[#92795c]"
        >
          We are getting married
        </motion.p>


        {/* ========================================
            COUPLE IMAGE
            ======================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative mt-8"
        >

          {/* Outer frame */}
          <div className="absolute -inset-3 rounded-t-[180px] border border-[#c8aa82]" />

          {/* Decorative flower - left */}
          <div className="absolute -left-10 bottom-10 z-20 text-[#c89da5]">
            <Flower2 size={42} strokeWidth={1} />
          </div>

          {/* Decorative flower - right */}
          <div className="absolute -right-10 top-12 z-20 text-[#c89da5]">
            <Flower2 size={42} strokeWidth={1} />
          </div>

          <img
            src="/images/wedding1/couple1.jpg"
            alt="Bride and Groom"
            className="h-[360px] w-[260px] rounded-t-[140px] object-cover shadow-xl sm:h-[430px] sm:w-[310px] sm:rounded-t-[160px]"
          />

        </motion.div>


        {/* ========================================
            NAMES
            ======================================== */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 font-serif text-5xl font-normal text-[#49382d] sm:text-6xl md:text-7xl"
        >
          Kasun{" "}
          <span className="mx-2 text-[#b89b72]">&</span>{" "}
          Amaya
        </motion.h1>


        {/* ========================================
            DATE
            ======================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex items-center gap-4 text-sm tracking-[0.3em] text-[#80694f]"
        >
          <span>20</span>
          <span>•</span>
          <span>12</span>
          <span>•</span>
          <span>2026</span>
        </motion.div>


        {/* ========================================
            INVITATION LINE
            ======================================== */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-5 max-w-md text-sm italic text-[#92795c]"
        >
          We invite you to celebrate our special day with us
        </motion.p>


        {/* ========================================
            SCROLL INDICATOR
            ======================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 flex flex-col items-center text-[#92795c]"
        >

          <span className="mb-2 text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ChevronDown size={20} strokeWidth={1} />
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}