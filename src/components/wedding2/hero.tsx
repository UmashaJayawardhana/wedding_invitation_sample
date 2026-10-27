
"use client";

import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#173c4b] text-center"
    >
   {/* Full photo without cropping */}
<div className="absolute inset-0 flex items-center justify-center bg-[#173c4b]">
  <img
    src="/images/wedding2/couple9.jpeg"
    alt="Olivia and Thomas"
    className="h-full w-full object-contain"
  />
</div>
{/* Soft overlay for readable text */}
<div className="absolute inset-0 bg-gradient-to-b from-[#102c3a]/30 via-transparent to-[#102c3a]/65" />
      {/* Sunset color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102c3a]/45 via-[#173c4b]/35 to-[#102c3a]/80" />

      {/* Warm sunset glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-[#f7c69b]/40 blur-3xl"
        />
      </div>

      {/* Wedding content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-5 py-6"
      >
        {/* Intro */}
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#fff0df] sm:text-xs sm:tracking-[0.4em]">
          Together with our families
        </p>

        <h1 className="mt-3 font-serif text-2xl font-light tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl">
          We&apos;re Getting Married
        </h1>

        {/* Names */}
        <div className="mt-5 flex flex-col items-center sm:mt-7">
          <h2 className="font-serif text-5xl font-light tracking-wide text-white drop-shadow-lg sm:text-7xl md:text-8xl">
            Olivia
          </h2>

          <div className="my-1 flex items-center gap-3 sm:my-2">
            <span className="h-px w-8 bg-[#f5d8bd]/80 sm:w-12" />
            <Heart className="h-5 w-5 fill-[#f3c3a7] text-[#f3c3a7] sm:h-6 sm:w-6" />
            <span className="h-px w-8 bg-[#f5d8bd]/80 sm:w-12" />
          </div>

          <h2 className="font-serif text-5xl font-light tracking-wide text-white drop-shadow-lg sm:text-7xl md:text-8xl">
            Thomas
          </h2>
        </div>

        {/* Date */}
        <div className="mt-5 sm:mt-7">
          <div className="mx-auto mb-3 h-px w-16 bg-[#f5d8bd]/80 sm:w-24" />

          <p className="text-xs uppercase tracking-[0.25em] text-[#fff0df] drop-shadow sm:text-base sm:tracking-[0.35em]">
            20 December 2026
          </p>

          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-white drop-shadow sm:text-sm">
            <MapPin className="h-4 w-4 text-[#f3c3a7]" />
            Join us as we begin our forever
          </p>
        </div>

        {/* Bottom message */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-7 left-0 right-0 px-4 text-[9px] uppercase tracking-[0.3em] text-white/90 sm:bottom-8 sm:text-xs sm:tracking-[0.4em]"
        >
          A beautiful beginning
        </motion.div>
      </motion.div>
    </section>
  );
}
