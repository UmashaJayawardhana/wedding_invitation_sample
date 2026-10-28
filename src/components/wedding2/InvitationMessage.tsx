
"use client";

import { motion } from "framer-motion";
import { Heart, Waves } from "lucide-react";

export type InvitationType = "single" | "couple" | "family" | string;

interface InvitationMessageProps {
  guestName?: string;
  invitationType?: InvitationType;
}

export default function InvitationMessage({
  guestName = "Alex",
  invitationType,
}: InvitationMessageProps) {
  // Normalize the invitation type from the parent page or database.
  const rawType = String(invitationType ?? "single")
    .trim()
    .toLowerCase();

  const activeType: "single" | "couple" | "family" =
    rawType.includes("family") || rawType === "3"
      ? "family"
      : rawType.includes("couple") || rawType === "2"
        ? "couple"
        : "single";

  const cleanGuestName = guestName.trim() || "Guest";
  const lowerName = cleanGuestName.toLowerCase();

  const coupleGreeting =
    cleanGuestName.includes("&") ||
    lowerName.includes(" and ") ||
    lowerName.endsWith(" & partner")
      ? `Dear ${cleanGuestName}`
      : `Dear ${cleanGuestName} & Partner`;

  const familyGreeting = lowerName.endsWith("family")
    ? `Dear ${cleanGuestName}`
    : `Dear ${cleanGuestName} & Family`;

  const invitationContent = {
    single: {
      greeting: `Dear ${cleanGuestName}`,
      introduction:
        "As the ocean meets the shore and the sunset paints the sky, we invite you to share in the beginning of our forever.",
      message:
        "Your presence would make our special day even more beautiful. Join us as we celebrate love, laughter, and the promise of a lifetime together.",
      closing: "We can't wait to celebrate with you",
    },
    couple: {
      greeting: coupleGreeting,
      introduction:
        "As the ocean meets the shore and the sunset paints the sky, we invite you both to share in the beginning of our forever.",
      message:
        "It would mean so much to have you both with us on our special day. Join us as we celebrate love, laughter, and the beautiful journey of a lifetime together.",
      closing: "We can't wait to celebrate with you both",
    },
    family: {
      greeting: familyGreeting,
      introduction:
        "As the ocean meets the shore and the sunset paints the sky, we warmly invite your family to share in the beginning of our forever.",
      message:
        "Your family's presence and blessings would make our special day even more meaningful. We would be delighted to celebrate this beautiful occasion with all of you as we begin our journey together.",
      closing: "We look forward to celebrating with your family",
    },
  };

  const content = invitationContent[activeType];

  return (
    <section
      id="invitation-message"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#173c4b] px-4 py-8 text-center sm:px-8"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/wedding2/bg1.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#173c4b]/35" />

      {/* Invitation card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 my-auto w-full max-w-2xl border border-[#d6bd96]/80 bg-[#fffaf1]/90 px-6 py-8 shadow-2xl backdrop-blur-sm sm:px-12 sm:py-10 md:px-16"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c6ad86]/70">
          <Heart
            className="h-5 w-5 text-[#b78e68]"
            strokeWidth={1.3}
          />
        </div>

        <p className="mt-4 text-[9px] uppercase tracking-[0.35em] text-[#78908b] sm:text-xs">
          A special invitation for
        </p>

        <h2 className="mt-3 break-words font-serif text-4xl italic text-[#426969] sm:text-5xl md:text-6xl">
          {content.greeting}
        </h2>

        <div className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-9 bg-[#c6ad86]" />
          <Waves
            className="h-5 w-5 text-[#83aaa9]"
            strokeWidth={1.2}
          />
          <span className="h-px w-9 bg-[#c6ad86]" />
        </div>

        <h3 className="font-serif text-2xl text-[#735b48] sm:text-3xl">
          With joyful hearts,
        </h3>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#746b60] sm:text-base sm:leading-8">
          {content.introduction}
        </p>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#746b60] sm:text-base sm:leading-8">
          {content.message}
        </p>

        <div className="mt-6">
          <p className="font-serif text-2xl text-[#426969] sm:text-3xl">
            Olivia{" "}
            <span className="mx-1 italic text-[#b78e68]">
              &
            </span>{" "}
            Thomas
          </p>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#9b866d]">
            20 December 2026
          </p>
        </div>

        <div className="mx-auto mt-6 h-px w-16 bg-[#c6ad86]" />

        <p className="mt-4 font-serif text-lg italic text-[#6e9997]">
          {content.closing}
        </p>

        <div className="mt-4 flex justify-center gap-2 text-[#83aaa9]">
          <Waves size={20} strokeWidth={1} />
          <Heart size={16} strokeWidth={1} />
          <Waves size={20} strokeWidth={1} />
        </div>
      </motion.div>
    </section>
  );
}