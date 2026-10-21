"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface InvitationMessageProps {
  guestName: string;
  invitationType: string;
}

export default function InvitationMessage({
  guestName,
  invitationType,
}: InvitationMessageProps) {
  const type = invitationType.toLowerCase();

  const getInvitationMessage = () => {
    switch (type) {
      case "single":
        return (
          <>
            <span className="font-semibold">{guestName}</span>, you are
            warmly invited to celebrate our special day with us.
          </>
        );

      case "couple":
        return (
          <>
            <span className="font-semibold">{guestName}</span>, you are both
            warmly invited to celebrate our special day with us.
          </>
        );

      case "family":
        return (
          <>
            <span className="font-semibold">{guestName}</span> and family are
            warmly invited to celebrate our special day with us.
          </>
        );

      default:
        return (
          <>
            <span className="font-semibold">{guestName}</span>, you are
            warmly invited to celebrate our special day with us.
          </>
        );
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f1e8]">

      {/* ========================================
          CENTRAL BACKGROUND IMAGE
          ======================================== */}

      <div className="absolute inset-y-0 left-4 right-4 overflow-hidden md:left-[4.5in] md:right-[4.5in]">

        <img
          src="/images/wedding1/invimsgbg2.jpg"
          alt="Invitation message background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-[#f7f1e8]/30" />

      </div>


      {/* ========================================
          CONTENT
          ======================================== */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl px-6 py-16 text-center"
      >

        {/* Decorative Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <Heart
            size={28}
            strokeWidth={1.5}
            className="text-[#9b6b6b]"
          />
        </motion.div>


        {/* Small Heading */}
        <p className="text-xs uppercase tracking-[0.4em] text-[#8b7355]">
          With love
        </p>


        {/* Main Heading */}
        <h1 className="mt-5 font-serif text-4xl text-[#4b3a2f] md:text-6xl">
          You Are Invited
        </h1>


        {/* Guest Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <p className="font-serif text-2xl text-[#7a3e4d] md:text-3xl">
            {guestName}
          </p>
        </motion.div>


        {/* Invitation Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#6b4a3a] md:text-lg"
        >
          {getInvitationMessage()}
        </motion.p>


        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
        </motion.div>


        {/* Wedding Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10"
        >
          <p className="mt-2 text-sm text-[#6b4a3a]">
            We look forward to celebrating with you
          </p>
        </motion.div>


        {/* Decorative Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10"
        >
          <div className="mx-auto h-px w-20 bg-[#b89b72]" />

          <p className="mt-4 font-serif text-sm italic text-[#8b7355]">
            With love, joy & forever
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
}