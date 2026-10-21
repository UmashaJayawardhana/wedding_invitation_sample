
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower2, Heart } from "lucide-react";

const weddingDate = new Date("2026-12-20T10:00:00");

function getTimeLeft() {
  const difference = weddingDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    {
      value: timeLeft.days,
      label: "Days",
    },
    {
      value: timeLeft.hours,
      label: "Hours",
    },
    {
      value: timeLeft.minutes,
      label: "Minutes",
    },
    {
      value: timeLeft.seconds,
      label: "Seconds",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] px-6 py-24">

      {/* Decorative circles */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#d8c3a5] opacity-25" />

      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full border border-[#d8c3a5] opacity-25" />

      {/* Top-left flower */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute left-4 top-8 md:left-14"
      >
        <Flower2
          size={45}
          strokeWidth={1}
          className="rotate-[-15deg] text-[#c89da5]"
        />

        <Flower2
          size={25}
          strokeWidth={1}
          className="absolute left-10 top-8 text-[#b99572]"
        />
      </motion.div>

      {/* Bottom-right flower */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-8 right-4 md:right-14"
      >
        <Flower2
          size={45}
          strokeWidth={1}
          className="rotate-[15deg] text-[#c89da5]"
        />

        <Flower2
          size={25}
          strokeWidth={1}
          className="absolute right-10 top-8 text-[#b99572]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-[#92795c]"
        >
          Counting the moments
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 font-serif text-4xl text-[#49382d] md:text-5xl"
        >
          Until We Say "I Do"
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 h-px bg-[#b89b72]"
        />

        {/* Countdown */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

          {countdownItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="rounded-[45px] border border-[#d8c3a5] bg-[#fbf7f1] px-4 py-8"
            >

              <motion.div
                key={item.value}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-4xl text-[#49382d] md:text-5xl"
              >
                {String(item.value).padStart(2, "0")}
              </motion.div>

              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#92795c]">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14"
        >

          <Heart
            size={22}
            strokeWidth={1}
            className="mx-auto text-[#c89da5]"
          />

          <p className="mt-5 font-serif text-xl italic text-[#715d4b]">
            We can't wait to celebrate with you.
          </p>

        </motion.div>

      </div>
    </section>
  );
}

