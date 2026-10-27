
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Heart,
  Waves,
  Navigation,
} from "lucide-react";

const weddingDate = new Date("2026-12-20T16:00:00+05:30");

function getTimeLeft() {
  const difference = Math.max(
    0,
    weddingDate.getTime() - Date.now()
  );

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownEventDetails() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#102d36] px-3 py-6 sm:px-6 sm:py-10"
    >
      {/* Couple photo background */}
      <div className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center">
        <img
          src="/images/wedding2/couple7.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain object-center"
        />
      </div>

      {/* Minimal overlay: keep the photo visible */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#102d36]/10" />

      {/* Main content panel */}
      <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/30 bg-[#102d36]/35 px-4 py-6 text-center text-white shadow-2xl backdrop-blur-[2px] sm:px-8 sm:py-8 md:px-10 md:py-10">
        <Waves
          size={32}
          className="mx-auto mb-3 text-[#f0d9ad]"
        />

        <p className="text-xs uppercase tracking-[0.25em] text-[#f0d9ad] sm:text-sm sm:tracking-[0.4em]">
          Counting Down to Forever
        </p>

        <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">
          Olivia <span className="text-[#e7c995]">&</span> Thomas
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-white drop-shadow-md sm:text-base">
          Together with our families, we invite you to celebrate our love.
        </p>

        <div className="my-6 flex items-center justify-center gap-3 sm:my-8">
          <span className="h-px w-10 bg-[#e7c995] sm:w-16" />
          <Heart
            size={18}
            className="fill-[#e7c995] text-[#e7c995]"
          />
          <span className="h-px w-10 bg-[#e7c995] sm:w-16" />
        </div>

        {/* Live countdown */}
        <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/35 bg-[#102d36]/35 px-1 py-3 shadow-lg sm:px-3 sm:py-5">
              <div className="font-serif text-2xl tabular-nums text-[#f0d9ad] sm:text-4xl md:text-5xl">
                {String(item.value).padStart(2, "0")}
              </div>

              <div className="mt-1 text-[9px] uppercase tracking-wider text-white sm:text-xs sm:tracking-[0.2em]">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm font-medium text-white drop-shadow-md sm:text-base">
          Sunday, 20 December 2026
        </p>

        {/* Ceremony and reception */}
        <div className="mt-7 grid gap-4 text-left sm:mt-8 sm:grid-cols-2 sm:gap-5">
          {/* Ceremony */}
          <div className="rounded-2xl border border-white/35 bg-[#102d36]/40 p-4 shadow-lg sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#e7c995]/20 p-3">
                <CalendarDays
                  size={22}
                  className="text-[#f0d9ad]"
                />
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl">
                  Ceremony
                </h3>
                <p className="mt-1 text-sm text-white">
                  Sunday, 20 December
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <Clock
                size={18}
                className="mt-0.5 shrink-0 text-[#f0d9ad]"
              />
              <p className="text-sm text-white">4:00 PM</p>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#f0d9ad]"
              />
              <p className="text-sm leading-relaxed text-white">
                Ocean View Wedding Venue
              </p>
            </div>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e7c995]/70 bg-[#102d36]/20 px-4 py-2 text-xs text-[#ffe4ae] transition hover:bg-[#e7c995]/20 sm:text-sm"
            >
              <Navigation size={15} />
              View Location
            </a>
          </div>

          {/* Reception */}
          <div className="rounded-2xl border border-white/35 bg-[#102d36]/40 p-4 shadow-lg sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#e7c995]/20 p-3">
                <Heart
                  size={22}
                  className="text-[#f0d9ad]"
                />
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl">
                  Reception
                </h3>
                <p className="mt-1 text-sm text-white">
                  Celebrate with us
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <Clock
                size={18}
                className="mt-0.5 shrink-0 text-[#f0d9ad]"
              />
              <p className="text-sm text-white">
                6:00 PM onwards
              </p>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#f0d9ad]"
              />
              <p className="text-sm leading-relaxed text-white">
                Ocean View Wedding Venue
              </p>
            </div>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e7c995]/70 bg-[#102d36]/20 px-4 py-2 text-xs text-[#ffe4ae] transition hover:bg-[#e7c995]/20 sm:text-sm"
            >
              <Navigation size={15} />
              View Location
            </a>
          </div>
        </div>

        <p className="mt-7 font-serif text-lg italic text-[#ffe4ae] drop-shadow-md sm:mt-8 sm:text-xl">
          We can’t wait to celebrate with you!
        </p>
      </div>
    </section>
  );
}
