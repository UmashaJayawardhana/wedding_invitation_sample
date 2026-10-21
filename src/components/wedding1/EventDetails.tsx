
"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Flower2,
} from "lucide-react";

const venue = "Shangri-La Colombo, Sri Lanka";

function openGoogleMaps() {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

export default function EventDetails() {
  return (
    <section className="relative overflow-hidden bg-[#fbf7f1] px-6 py-24">

      {/* Background decoration */}
      <div className="absolute -left-44 top-20 h-80 w-80 rounded-full border border-[#d8c3a5] opacity-30" />

      <div className="absolute -right-44 bottom-20 h-96 w-96 rounded-full border border-[#d8c3a5] opacity-30" />

      {/* Top left flower */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
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

      {/* Bottom right flower */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
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

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Heading */}
        <div className="text-center">

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-[#92795c]"
          >
            Join us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-4 font-serif text-4xl text-[#49382d] md:text-5xl"
          >
            The Wedding Day
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 h-px bg-[#b89b72]"
          />

        </div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto mt-14 max-w-xl border-y border-[#d8c3a5] py-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#92795c]">
            December
          </p>

          <div className="mt-2 flex items-center justify-center gap-5">

            <span className="font-serif text-5xl text-[#49382d]">
              20
            </span>

            <span className="h-12 w-px bg-[#c8aa82]" />

            <span className="font-serif text-5xl text-[#49382d]">
              2026
            </span>

          </div>

          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-[#92795c]">
            Sunday
          </p>
        </motion.div>

        {/* Ceremony + Reception */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[70px] border border-[#d8c3a5] bg-[#f7f1e8] px-8 py-10 text-center"
          >

            <CalendarDays
              size={30}
              strokeWidth={1}
              className="mx-auto text-[#b89b72]"
            />

            <h3 className="mt-5 font-serif text-2xl text-[#49382d]">
              Wedding Ceremony
            </h3>

            <div className="mx-auto mt-5 h-px w-12 bg-[#c8aa82]" />

            <div className="mt-6 flex items-center justify-center gap-3 text-[#715d4b]">
              <Clock3 size={17} strokeWidth={1.3} />

              <span className="text-sm tracking-[0.15em]">
                10:00 AM
              </span>
            </div>

            <p className="mt-4 text-sm text-[#92795c]">
              Please join us as we exchange
              our vows and begin our journey together.
            </p>

          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[70px] border border-[#d8c3a5] bg-[#f7f1e8] px-8 py-10 text-center"
          >

            <Clock3
              size={30}
              strokeWidth={1}
              className="mx-auto text-[#b89b72]"
            />

            <h3 className="mt-5 font-serif text-2xl text-[#49382d]">
              Reception
            </h3>

            <div className="mx-auto mt-5 h-px w-12 bg-[#c8aa82]" />

            <div className="mt-6 flex items-center justify-center gap-3 text-[#715d4b]">
              <Clock3 size={17} strokeWidth={1.3} />

              <span className="text-sm tracking-[0.15em]">
                6:30 PM
              </span>
            </div>

            <p className="mt-4 text-sm text-[#92795c]">
              Dinner, music and wonderful memories
              await as we celebrate together.
            </p>

          </motion.div>

        </div>

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl rounded-[70px] border border-[#c8aa82] bg-[#f7f1e8] px-8 py-10 text-center"
        >

          <MapPin
            size={34}
            strokeWidth={1}
            className="mx-auto text-[#b89b72]"
          />

          <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#92795c]">
            Wedding Venue
          </p>

          <h3 className="mt-3 font-serif text-3xl text-[#49382d]">
            Shangri-La Colombo
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#92795c]">
            1 Galle Face, Colombo 02,
            <br />
            Sri Lanka
          </p>

          <button
            onClick={openGoogleMaps}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#b89b72] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#5c4635] transition-all duration-300 hover:bg-[#b89b72] hover:text-white"
          >
            <Navigation size={15} strokeWidth={1.5} />
            View Location
          </button>

        </motion.div>

      </div>
    </section>
  );
}
