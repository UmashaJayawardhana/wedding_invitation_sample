"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Heart,
  Sparkles,
} from "lucide-react";

interface EventDetailsProps {
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  address?: string;
  mapsUrl?: string;
}

export default function EventDetails({
  eventDate = "December 20, 2026",
  eventTime = "4:00 PM",
  venue = "The Grand Celebration Hall",
  address = "Matara, Sri Lanka",
  mapsUrl = "https://maps.google.com/",
}: EventDetailsProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isFinished, setIsFinished] = useState(false);

  /*
   * IMPORTANT:
   * Change this date and time to your actual event date.
   *
   * Format:
   * YYYY-MM-DDTHH:mm:ss
   *
   * Example:
   * December 20, 2026 at 4:00 PM
   */
  const targetDate = new Date("2026-12-20T16:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
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
      });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-[#fffaf8] px-5 py-20 sm:px-8 md:px-12 lg:px-20">

      {/* ================================= */}
      {/* BACKGROUND DECORATIONS */}
      {/* ================================= */}

      {/* Blue glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-[#bde5f5] blur-3xl"
      />

      {/* Pink glow */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-[#f5c5d8] blur-3xl"
      />

      {/* Floating blue heart */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[5%] top-[18%] text-4xl text-[#83c7e5]"
      >
        💙
      </motion.div>

      {/* Floating pink heart */}
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
        className="absolute right-[5%] top-[28%] text-4xl"
      >
        💗
      </motion.div>

      {/* Bow */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[18%] left-[7%] text-4xl"
      >
        🎀
      </motion.div>

      {/* Sparkles */}
      <Sparkles
        className="absolute right-[12%] top-[18%] text-[#e8b1c7]"
        size={25}
      />

      <Sparkles
        className="absolute left-[15%] bottom-[25%] text-[#a8d8ea]"
        size={22}
      />

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="text-xl">💙</span>

            <div className="h-px w-12 bg-[#b7dceb] sm:w-20" />

            <span className="text-2xl">🎀</span>

            <div className="h-px w-12 bg-[#efbfd2] sm:w-20" />

            <span className="text-xl">💗</span>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9b8579]">
            Save The Date
          </p>

          <h2 className="font-serif text-4xl text-[#514238] sm:text-5xl md:text-6xl">
            Let&apos;s Celebrate!
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#806f65] sm:text-base">
            Join us for a very special celebration as we discover
            the sweetest little surprise together.
          </p>
        </motion.div>

        {/* ================================= */}
        {/* EVENT INFORMATION */}
        {/* ================================= */}

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

          {/* DATE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] border border-[#d7eaf2] bg-white/80 p-7 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f5fb] text-[#6ca7c2]">
              <CalendarDays size={28} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a18d82]">
              Date
            </p>

            <h3 className="font-serif text-2xl text-[#514238]">
              {eventDate}
            </h3>

            <p className="mt-2 text-sm text-[#968279]">
              A day to remember
            </p>
          </motion.div>

          {/* TIME */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] border border-[#f1d4df] bg-white/80 p-7 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f5] text-[#c789a2]">
              <Clock3 size={28} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a18d82]">
              Time
            </p>

            <h3 className="font-serif text-2xl text-[#514238]">
              {eventTime}
            </h3>

            <p className="mt-2 text-sm text-[#968279]">
              Come join the fun
            </p>
          </motion.div>

          {/* PLACE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] border border-[#ead8df] bg-white/80 p-7 text-center shadow-lg backdrop-blur-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf0f5] text-[#c989a2]">
              <MapPin size={28} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a18d82]">
              Place
            </p>

            <h3 className="font-serif text-2xl text-[#514238]">
              {venue}
            </h3>

            <p className="mt-2 text-sm text-[#968279]">
              {address}
            </p>
          </motion.div>

        </div>

        {/* ================================= */}
        {/* GOOGLE MAP BUTTON */}
        {/* ================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#514238] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#6b574b]"
          >
            <Navigation size={17} />
            View Location
          </a>
        </motion.div>

        {/* ================================= */}
        {/* COUNTDOWN */}
        {/* ================================= */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[35px] border border-white/80 bg-white/75 px-5 py-10 shadow-xl backdrop-blur-md sm:px-10 sm:py-14">

            {/* Small decorations */}
            <div className="absolute left-5 top-5 text-2xl">
              💙
            </div>

            <div className="absolute right-5 top-5 text-2xl">
              🎀
            </div>

            <div className="absolute bottom-5 left-8 text-xl">
              ✨
            </div>

            <div className="absolute bottom-5 right-8 text-xl">
              💗
            </div>

            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a18d82]">
                The Big Surprise Is Coming
              </p>

              <h3 className="mt-3 font-serif text-3xl text-[#514238] sm:text-4xl">
                Countdown to the Reveal
              </h3>

              {!isFinished ? (
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">

                  {/* DAYS */}
                  <CountdownBox
                    value={timeLeft.days}
                    label="Days"
                    type="blue"
                  />

                  {/* HOURS */}
                  <CountdownBox
                    value={timeLeft.hours}
                    label="Hours"
                    type="pink"
                  />

                  {/* MINUTES */}
                  <CountdownBox
                    value={timeLeft.minutes}
                    label="Minutes"
                    type="blue"
                  />

                  {/* SECONDS */}
                  <CountdownBox
                    value={timeLeft.seconds}
                    label="Seconds"
                    type="pink"
                  />

                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-10"
                >
                  <div className="text-6xl">
                    🎉
                  </div>

                  <h4 className="mt-4 font-serif text-3xl text-[#514238]">
                    The Big Day Is Here!
                  </h4>

                  <p className="mt-2 text-[#806f65]">
                    It&apos;s time to discover the surprise!
                  </p>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center justify-center gap-3 text-xl">
          <span>💙</span>
          <span>✨</span>
          <span>🎀</span>
          <Heart
            size={18}
            className="fill-[#e9a8bf] text-[#e9a8bf]"
          />
          <span>🎀</span>
          <span>✨</span>
          <span>💗</span>
        </div>

      </div>
    </section>
  );
}

/* ================================= */
/* COUNTDOWN BOX */
/* ================================= */

interface CountdownBoxProps {
  value: number;
  label: string;
  type: "blue" | "pink";
}

function CountdownBox({
  value,
  label,
  type,
}: CountdownBoxProps) {
  const isBlue = type === "blue";

  return (
    <motion.div
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`rounded-[22px] border p-5 sm:p-7 ${
        isBlue
          ? "border-[#d2eaf3] bg-[#eef9fd]"
          : "border-[#f3d5e1] bg-[#fff3f7]"
      }`}
    >
      <div
        className={`font-serif text-4xl font-semibold sm:text-5xl md:text-6xl ${
          isBlue
            ? "text-[#6da8c1]"
            : "text-[#c887a1]"
        }`}
      >
        {String(value).padStart(2, "0")}
      </div>

      <p
        className={`mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs ${
          isBlue
            ? "text-[#7faec2]"
            : "text-[#bd879d]"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}