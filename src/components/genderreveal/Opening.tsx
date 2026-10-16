"use client";

import { motion } from "framer-motion";
import { Heart, Baby } from "lucide-react";

interface OpeningProps {
  guestName?: string;
  onOpen: () => void;
}

export default function Opening({
  guestName = "Dear Guest",
  onOpen,
}: OpeningProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#faf7f3]">
      {/* Background Image */}
      <div className="absolute inset-0 md:left-[30%] md:right-[30%] w-full h-full md:w-auto">
        <img
          src="/images/genderreveal/openingbg.png"
          alt="Gender reveal invitation background"
          className="h-full w-full object-cover object-center"
        />
      </div>


      {/* Blue background */}
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -left-32 -top-20 h-[520px] w-[520px] rounded-full bg-[#a9d9f0] opacity-70 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-[430px] w-[430px] rounded-full bg-[#c4e8f8] blur-3xl"
      />

      {/* Pink background */}
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-[#f2bfd3] opacity-70 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="pointer-events-none absolute -bottom-32 -right-32 h-[430px] w-[430px] rounded-full bg-[#f8d5e1] blur-3xl"
      />

      {/* Floating dots */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[8%] top-[22%] h-5 w-5 rounded-full bg-[#78b9dc]"
      />

      <motion.div
        animate={{
          y: [0, 18, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[18%] top-[68%] h-3 w-3 rounded-full bg-[#8ac7e5]"
      />

      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[10%] top-[24%] h-5 w-5 rounded-full bg-[#df91ae]"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[25%] right-[18%] h-3 w-3 rounded-full bg-[#e9a7be]"
      />

      {/* Decorative stars */}
      <motion.div
        animate={{
          rotate: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute left-[25%] top-[15%] text-[#6daed2]"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute right-[25%] top-[16%] text-[#d889a5]"
      >
        ✦
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md text-center"
        >

          {/* Baby icon */}
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/75 shadow-lg backdrop-blur-md">
              <Baby
                size={34}
                strokeWidth={1.3}
                className="text-[#8b7355]"
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-[#8b7355]"
          >
            A Little Surprise Is On The Way
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.7,
            }}
            className="font-serif text-5xl leading-tight text-[#514238] sm:text-6xl"
          >
            Boy or Girl?
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: 80,
            }}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="mx-auto my-5 h-[2px] bg-gradient-to-r from-[#8ec7e5] via-[#b69a7c] to-[#e3a1b9]"
          />

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 1.1,
            }}
            className="mx-auto max-w-sm text-[15px] leading-7 text-[#75685d]"
          >
            Join us for a beautiful celebration as we discover whether
            our little one is a{" "}
            <span className="font-semibold text-[#5796bc]">
              boy
            </span>{" "}
            or a{" "}
            <span className="font-semibold text-[#c67896]">
              girl
            </span>
            .
          </motion.p>

          {/* Team cards */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 1.3,
            }}
            className="mx-auto mt-8 flex max-w-sm items-center gap-3"
          >

            {/* Boy */}
            {/* <motion.div
              whileHover={{
                y: -5,
              }}
              className="flex-1 rounded-3xl border border-[#b9dff1] bg-gradient-to-br from-[#dff3fc] to-[#b9e0f3] px-5 py-5 shadow-md"
            >
              <div className="text-4xl">
                💙
              </div>

              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#5089ad]">
                Team Boy
              </p>
            </motion.div> */}

            {/* OR */}
            {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-[10px] font-semibold text-[#9a8069] shadow-sm">
              OR
            </div> */}

            {/* Girl */}
            {/* <motion.div
              whileHover={{
                y: -5,
              }}
              className="flex-1 rounded-3xl border border-[#f0c5d5] bg-gradient-to-br from-[#ffeaf2] to-[#f3c2d5] px-5 py-5 shadow-md"
            >
              <div className="text-4xl">
                🎀
              </div> */}

            {/* <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#b56f8c]">
                Team Girl
              </p>
            </motion.div> */}

          </motion.div>

          {/* Guest name */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.5,
            }}
            className="mt-8"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#a08d7d]">
              Especially For
            </p>

            <p className="mt-2 font-serif text-2xl text-[#514238]">
              {guestName}
            </p>
          </motion.div>

          {/* OPEN INVITATION BUTTON */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.8,
            }}
            className="relative z-50 mt-8"
          >
            <motion.button
              type="button"
              onClick={onOpen}
              whileHover={{
                scale: 1.04,
                boxShadow:
                  "0 15px 35px rgba(100, 80, 60, 0.2)",
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="group relative z-50 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#695548] px-9 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-xl"
            >
              <Heart
                size={17}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:scale-125"
              />

              Open Invitation
            </motion.button>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 2.1,
            }}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-[#9c8978]">
              <span>💙</span>
              <span>A tiny guess</span>
              <span>•</span>
              <span>A big surprise</span>
              <span>🎀</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}