"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface OpeningProps {
  onOpen: (guestName: string) => void;
}

export default function Opening({ onOpen }: OpeningProps) {
  const [guestName, setGuestName] = useState("");

  const handleOpen = () => {
    if (!guestName.trim()) return;
    onOpen(guestName.trim());
  };

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden bg-[#f7f1e8]"
    >
      {/* Background Image */}
      <div className="relative h-full w-full md:h-screen md:w-[700px]">
        <img
          src="/images/wedding1/openbg.jpg"
          alt="Wedding background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Content - NO gray background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center"
        >
          <div className="w-full max-w-md text-white">

            <p className="text-xs uppercase tracking-[0.4em] text-[#6b4a3a] drop-shadow-sm">
              Together with their families
            </p>

            <h1 className="mt-6 font-serif text-5xl text-[#4b2e2e] drop-shadow-sm md:text-6xl">
              Our Wedding
            </h1>

            <p className="mt-4 text-lg text-[#6b4a3a] drop-shadow-sm">
              Bride & Groom
            </p>


            <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-[#6b4a3a] drop-shadow-sm">
              You are warmly invited to celebrate our special day with us.
            </p>

            {/* Guest Name */}
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#6b4a3a] drop-shadow-sm">
                Please enter your name
              </p>

              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOpen();
                  }
                }}
                placeholder="Your Name"
                className="w-full rounded-full border border-[#8b5e5e] bg-white/20 px-6 py-3 text-center text-sm text-[#4b2e2e] outline-none placeholder:text-[#6b4a3a] focus:border-[#7a3e4d]"
              />
            </div>

            {/* Open Button */}
            <button
              onClick={handleOpen}
              disabled={!guestName.trim()}
              className="mt-5 rounded-full border border-[#7a3e4d] px-8 py-3 text-xs tracking-[0.25em] text-[#7a3e4d] transition-all duration-300 hover:bg-[#7a3e4d] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              OPEN INVITATION
            </button>

            <p className="mt-6 text-xs italic text-[#6b4a3a] drop-shadow-sm">
              With love, joy & forever
            </p>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}