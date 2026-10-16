"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

interface EndingProps {
  parentOne?: string;
  parentTwo?: string;
}

export default function Ending({
  parentOne = "Kasun",
  parentTwo = "Amaya",
}: EndingProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#faf7f3] px-5 py-24">
      {/* Background Image */}
      <div className="absolute inset-0 md:left-[30%] md:right-[30%] w-full h-full md:w-auto">
        <img
          src="/images/genderreveal/openingbg.png"
          alt="Gender reveal invitation background"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Blue glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#b9e3f4] blur-3xl"
      />

      {/* Pink glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#f2c2d5] blur-3xl"
      />

      {/* Floating hearts */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[18%] text-3xl opacity-60"
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-[10%] top-[25%] text-3xl opacity-60"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[15%] text-2xl opacity-50"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute bottom-[25%] right-[15%] text-2xl opacity-50"
      >
        ✨
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Top decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="text-2xl">💙</span>

          <Sparkles className="h-5 w-5 text-[#d3a0b5]" />

          <Heart className="h-7 w-7 fill-[#e5b2c6] text-[#d99eb7]" />

          <Sparkles className="h-5 w-5 text-[#d3a0b5]" />

          <span className="text-2xl">🎀</span>
        </motion.div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#a18b80]"
        >
          Until The Big Reveal
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-5xl leading-tight text-[#514238] sm:text-7xl"
        >
          Thank You
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto my-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/80 text-4xl shadow-xl"
        >
          👶
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-2xl text-sm leading-8 text-[#7e6e65] sm:text-base"
        >
          Thank you for being part of this beautiful journey and
          sharing in one of the most exciting moments of our lives.
          We can't wait to celebrate this special day with you!
        </motion.p>

        {/* Parents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <p className="font-serif text-2xl text-[#514238] sm:text-3xl">
            {parentOne} & {parentTwo}
          </p>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#a18b80]">
            With love, always
          </p>
        </motion.div>

        {/* Final decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-3"
        >
          <div className="h-px flex-1 bg-[#dfd1c9]" />

          <Star className="h-4 w-4 text-[#d0a0b4]" />

          <div className="h-px flex-1 bg-[#dfd1c9]" />
        </motion.div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 font-serif text-sm italic text-[#9a887e]"
        >
          A little secret... a lifetime of love. 💙🎀
        </motion.p>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center gap-3 text-xl"
        >
          <span>💙</span>
          <span>🌸</span>
          <span>🎀</span>
          <span>✨</span>
          <span>🎀</span>
          <span>🌸</span>
          <span>💗</span>
        </motion.div>
      </div>
    </section>
  );
}