
"use client";

import { Heart, Sparkles } from "lucide-react";

export default function ThankYou() {
  return (
    <section
      id="thank-you"
      className="relative isolate overflow-hidden px-5 py-24 text-center text-[#24434a] sm:py-32"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/wedding2/couple6.jpeg')",
        }}
      />

      {/* Soft overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-[#f8f3eb]/80" />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl">
        <Heart
          size={32}
          strokeWidth={1.2}
          className="mx-auto mb-6 text-[#bd9b67]"
        />

        <p className="mb-5 text-xs uppercase tracking-[0.4em] text-[#9b805b]">
          With Love & Gratitude
        </p>

        <h2 className="font-[var(--font-great-vibes)] text-6xl sm:text-7xl md:text-8xl">
          Thank You
        </h2>

        <div className="my-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#bd9b67]" />
          <Sparkles size={17} className="text-[#bd9b67]" />
          <span className="h-px w-12 bg-[#bd9b67]" />
        </div>

        <p className="mx-auto max-w-xl text-base leading-8 text-[#647579] sm:text-lg">
          Thank you for being part of our beautiful journey.
          Your love, blessings, and warm wishes mean more to us
          than words can express.
        </p>

        <p className="mt-6 text-base italic text-[#647579]">
          We cannot wait to celebrate this special day with you.
        </p>

        <div className="mt-12">
          <p className="font-[var(--font-great-vibes)] text-4xl sm:text-5xl">
            Olivia & Thomas
          </p>

          <p className="mt-4 text-xs tracking-[0.3em] text-[#9b805b]">
            20 · 12 · 2026
          </p>
        </div>

        <Heart
          size={18}
          fill="currentColor"
          className="mx-auto mt-10 text-[#bd9b67]"
        />
      </div>
    </section>
  );
}
