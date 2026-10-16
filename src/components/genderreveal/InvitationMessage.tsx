"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface InvitationMessageProps {
  guestName?: string;
  parentOne?: string;
  parentTwo?: string;
}

export default function InvitationMessage({
  guestName = "Dear Guest",
  parentOne = "Kasun",
  parentTwo = "Amaya",
}: InvitationMessageProps) {
  return (
    <section className="relative overflow-hidden bg-[#fffaf7] px-5 py-24 sm:px-6 sm:py-28">

      {/* =========================
          SOFT BLUE BACKGROUND
      ========================= */}
      {/* Background Image */}
      <div className="absolute inset-0 md:left-[25%] md:right-[25%] w-full h-full md:w-auto">
        <img
          src="/images/genderreveal/invitemsgbg.png"
          alt="Gender reveal invitation background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-40 top-10
          h-96 w-96
          rounded-full
          bg-[#b9e3f5]
          blur-3xl
        "
      />

      {/* =========================
          SOFT PINK BACKGROUND
      ========================= */}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-40 bottom-10
          h-96 w-96
          rounded-full
          bg-[#f4c5d7]
          blur-3xl
        "
      />

      {/* =========================
          FLOATING BLUE HEARTS
      ========================= */}

      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[5%] top-[14%]
          text-3xl
          sm:text-4xl
        "
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[12%] top-[48%]
          text-xl
          sm:text-2xl
        "
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [8, -8, 8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[5%] top-[18%]
          text-3xl
          sm:text-4xl
        "
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, 18, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[12%] top-[55%]
          text-xl
          sm:text-2xl
        "
      >
        💙
      </motion.div>

      {/* =========================
          ROSE / PINK BOWS
      ========================= */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[8%] top-[32%]
          text-3xl
          sm:text-4xl
        "
      >
        🎀
      </motion.div>

      <motion.div
        animate={{
          y: [0, 14, 0],
          rotate: [6, -6, 6],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[8%] top-[40%]
          text-3xl
          sm:text-4xl
        "
      >
        🎀
      </motion.div>

      {/* =========================
          SMALL ROSE DECORATIONS
      ========================= */}

      <motion.div
        animate={{
          rotate: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[22%] top-[20%]
          text-lg
          sm:text-xl
        "
      >
        🌹
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[22%] top-[25%]
          text-lg
          sm:text-xl
        "
      >
        🌹
      </motion.div>

      {/* =========================
          BLUE SPARKLES
      ========================= */}

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-[18%] top-[65%] text-xl text-[#76b4d3]"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
        className="absolute right-[18%] top-[70%] text-xl text-[#d994ad]"
      >
        ✦
      </motion.div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="relative z-10 mx-auto max-w-3xl text-center">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-2 sm:gap-3"
        >
          <span className="h-px w-8 bg-[#a9d6eb] sm:w-16" />

          <span className="text-lg">🎀</span>

          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8b7355] sm:text-xs sm:tracking-[0.3em]">
            A Special Invitation
          </span>

          <span className="text-lg">🎀</span>

          <span className="h-px w-8 bg-[#efc3d5] sm:w-16" />
        </motion.div>

        {/* Guest name */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="
            font-serif
            text-4xl
            leading-tight
            text-[#514238]
            sm:text-5xl
          "
        >
          Dear {guestName}
        </motion.h2>

        {/* Blue heart */}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="my-6 flex justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-full
              border border-[#b9dff1]
              bg-[#edf9ff]
              shadow-sm
            "
          >
            <Heart
              size={27}
              strokeWidth={1.4}
              className="fill-[#8ec8e6] text-[#609fc1]"
            />
          </motion.div>
        </motion.div>

        {/* Message */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >

          <p className="font-serif text-xl leading-relaxed text-[#62564d] sm:text-2xl">
            A tiny little secret is growing,
            <br className="hidden sm:block" />
            and we are getting ready to discover
            <br className="hidden sm:block" />
            whether our little miracle is a
          </p>

          {/* =========================
              BOY / GIRL
          ========================= */}

          <div className="my-7 flex items-center justify-center gap-3 sm:gap-6">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                rounded-2xl
                border border-[#b9dff1]
                bg-[#eaf7fd]
                px-4 py-3
                shadow-sm
                sm:px-7 sm:py-4
              "
            >
              <span className="text-xs font-semibold tracking-wider text-[#568daf] sm:text-base">
                💙 LITTLE BOY
              </span>
            </motion.div>

            <span className="text-sm text-[#a08d7d]">
              or
            </span>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                rounded-2xl
                border border-[#f0c4d5]
                bg-[#fff0f5]
                px-4 py-3
                shadow-sm
                sm:px-7 sm:py-4
              "
            >
              <span className="text-xs font-semibold tracking-wider text-[#b56f8c] sm:text-base">
                LITTLE GIRL 🎀
              </span>
            </motion.div>

          </div>

          <p className="font-serif text-xl leading-relaxed text-[#62564d] sm:text-2xl">
            We would love to have you with us
            <br className="hidden sm:block" />
            as we reveal the sweetest surprise!
          </p>

        </motion.div>

        {/* =========================
            PARENTS
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10"
        >

          <p className="text-xs uppercase tracking-[0.3em] text-[#a08d7d]">
            With love,
          </p>

          <p className="mt-3 font-serif text-2xl text-[#514238] sm:text-3xl">
            {parentOne}
            <span className="mx-3 text-[#c990a7]">&</span>
            {parentTwo}
          </p>

        </motion.div>

        {/* =========================
            BOTTOM DECORATION
        ========================= */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-12 flex max-w-sm items-center justify-center gap-3"
        >

          <span className="h-px flex-1 bg-[#d6eaf3]" />

          <span className="text-lg">🍼</span>

          <span className="h-px flex-1 bg-[#f1d1dc]" />

        </motion.div>

      </div>
    </section>
  );
}