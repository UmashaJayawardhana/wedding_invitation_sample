
"use client";

import { motion } from "framer-motion";
import { Heart, Waves } from "lucide-react";

const story = [
  {
    number: "01",
    date: "The First Meeting",
    title: "The Day Our Story Began",
    description:
      "Sometimes, the most beautiful stories begin with a simple hello. What started as an ordinary day became the beginning of something extraordinary.",
    photos: [
      "/images/wedding2/couple1.jpeg",
      "/images/wedding2/couple2.jpeg",
      "/images/wedding2/couple3.jpeg",
    ],
  },
  {
    number: "02",
    date: "Falling in Love",
    title: "Little Moments, Big Feelings",
    description:
      "Through shared smiles, endless conversations, and unforgettable moments, we discovered a love that made every day brighter.",
    photos: [
      "/images/wedding2/couple4.jpeg",
      "/images/wedding2/couple6.jpeg",
      "/images/wedding2/couple7.jpeg",
    ],
  },
  {
    number: "03",
    date: "The Proposal",
    title: "A Promise for Forever",
    description:
      "With hearts full of love and dreams for the future, we chose each other and promised to walk through life hand in hand.",
    photos: [
      "/images/wedding2/couple8.jpeg",
      "/images/wedding2/couple1.jpeg",
      "/images/wedding2/couple9.jpeg",
    ],
  },
];

export default function CoupleStory() {
  return (
    <section
      id="couple-story"
      className="relative w-full overflow-hidden bg-[#173c4b] px-4 py-16 sm:px-8 sm:py-20"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/wedding2/story-background.jpg')",
        }}
      />

      {/* Ocean overlay */}
      <div className="absolute inset-0 bg-[#173c4b]/70" />

      {/* Sunset glow */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#efc4a2]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center sm:mb-16"
        >
          <Waves
            className="mx-auto mb-5 h-8 w-8 text-[#e9c7a5]"
            strokeWidth={1}
          />

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f1d5bb] sm:text-xs">
            Every love has a story
          </p>

          <h2 className="mt-4 font-serif text-4xl font-light text-white sm:text-6xl">
            Our Love Story
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
            Two hearts, one beautiful journey, and a forever that begins
            with us.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#e9c7a5]/70" />
            <Heart className="h-4 w-4 fill-[#e9c7a5] text-[#e9c7a5]" />
            <span className="h-px w-10 bg-[#e9c7a5]/70" />
          </div>
        </motion.div>

        {/* Three story chapters */}
        <div className="space-y-10 sm:space-y-14">
          {story.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-[#e9c7a5]/50 bg-[#fffaf1]/95 shadow-xl"
            >
              <div className="p-5 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8c9e99]">
                  Chapter {item.number}
                </p>

                <p className="mt-3 font-serif text-lg italic text-[#b78e68]">
                  {item.date}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#426969] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#746b60] sm:text-base">
                  {item.description}
                </p>
              </div>

              {/* Three-photo gallery */}
              <div className="grid grid-cols-3 gap-2 px-4 pb-5 sm:gap-4 sm:px-8 sm:pb-8">
                {item.photos.map((photo, photoIndex) => (
                  <motion.div
                    key={photo}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden rounded-lg border border-[#d6bd96]/60 bg-[#eee2d0]"
                  >
                    <img
                      src={photo}
                      alt={`${item.date} memory ${photoIndex + 1}`}
                      loading="lazy"
                      className="aspect-[3/4] h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pb-5">
                <Heart className="h-4 w-4 fill-[#d9b69a] text-[#d9b69a]" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 text-center sm:mt-20"
        >
          <Heart className="mx-auto h-6 w-6 fill-[#e9c7a5] text-[#e9c7a5]" />

          <p className="mt-4 font-serif text-2xl italic text-white sm:text-3xl">
            And our forever starts here...
          </p>

          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#f1d5bb]">
            Olivia & Thomas · 20 December 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
