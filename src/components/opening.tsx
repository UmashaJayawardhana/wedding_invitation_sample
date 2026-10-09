"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIDEO_SRC = "/videos/opening.mp4"; // your 10s opening video
const VIDEO_DURATION_MS = 10000;

// Couple photo shown inside the envelope card (put the file in /public/images)
const COUPLE_PHOTO = "/images/couple.jpg";
// Envelope artwork (transparent window where the card is)
const ENVELOPE_IMG = "/images/envelope.webp";
const ENVELOPE_ASPECT = 2106 / 2016;

const NAME_ONE = "Sarah";
const NAME_TWO = "Deen";

type Stage = "video" | "button" | "envelope";

type OpeningProps = {
  /** Called after the envelope seal is clicked and the envelope has opened */
  onOpen?: () => void;
};

export default function Opening({ onOpen }: OpeningProps) {
  const [stage, setStage] = useState<Stage>("video");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // After 10 seconds, move from video -> open button
  useEffect(() => {
    if (stage !== "video") return;
    const timer = setTimeout(() => setStage("button"), VIDEO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  // Lock scrolling while the intro overlay is visible
  useEffect(() => {
    if (stage === "envelope") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [stage]);

  // Keep the blurred background video in sync with the main video
  const syncBackground = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (Math.abs(bg.currentTime - fg.currentTime) > 0.2) {
      bg.currentTime = fg.currentTime;
    }
  };

  const handleSkip = () => {
    fgVideoRef.current?.pause();
    bgVideoRef.current?.pause();
    setStage("button");
  };

  const handleOpenInvitation = () => {
    setStage("envelope");
  };

  const handleSealClick = () => {
    if (envelopeOpened) return;
    setEnvelopeOpened(true);
    if (onOpen) setTimeout(onOpen, 1300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4ecdf] text-[#4b1821]">

      {/* =========================================================
          INTRO OVERLAY (video -> open invitation button)
      ========================================================= */}

      <AnimatePresence>
        {stage !== "envelope" && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          >

            {/* Blurred background video (fills the whole screen) */}
            <video
              ref={bgVideoRef}
              src={VIDEO_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
            />

            {/* Dark tint over the blur */}
            <div className="pointer-events-none absolute inset-0 bg-black/30" />


            {/* Main video (sharp, centered) */}
            <AnimatePresence>
              {stage === "video" && (
                <motion.video
                  key="main-video"
                  ref={fgVideoRef}
                  src={VIDEO_SRC}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onPlay={syncBackground}
                  onSeeked={syncBackground}
                  onTimeUpdate={syncBackground}
                  onEnded={() => setStage("button")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 h-full w-full object-contain"
                />
              )}
            </AnimatePresence>


            {/* Skip button (only while video is playing) */}
            <AnimatePresence>
              {stage === "video" && (
                <motion.button
                  key="skip"
                  type="button"
                  onClick={handleSkip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute bottom-8 right-6 z-20 rounded-full border border-white/50 bg-white/10 px-5 py-2 text-[11px] tracking-[0.3em] text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  SKIP
                </motion.button>
              )}
            </AnimatePresence>


            {/* Open invitation button (only element shown after video) */}
            <AnimatePresence>
              {stage === "button" && (
                <motion.button
                  key="open"
                  type="button"
                  onClick={handleOpenInvitation}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="relative z-20 rounded-full border border-[#d6b56d] bg-[#641725]/90 px-9 py-4 text-[12px] tracking-[0.35em] text-[#f5e6c4] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:bg-[#751d2d]"
                >
                  OPEN INVITATION
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>


      {/* =========================================================
          ENVELOPE SECTION
      ========================================================= */}

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f4ecdf] px-3">

        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={stage === "envelope" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-3 text-[11px] tracking-[0.35em] text-[#6b4a45]"
        >
          SAVE THE DATE
        </motion.p>

        {/* Envelope artwork + couple photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            stage !== "envelope"
              ? {}
              : envelopeOpened
              ? { opacity: 0, scale: 1.15, y: 0 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: envelopeOpened ? 1.1 : 1, ease: "easeOut" }}
          className="relative"
          style={{
            width: `min(100vw, calc(68vh * ${ENVELOPE_ASPECT}))`,
            aspectRatio: `${ENVELOPE_ASPECT}`,
          }}
        >
          {/* Couple photo (sits BEHIND the envelope image, shows through its window) */}
          <motion.div
            initial={{ y: "14%" }}
            animate={stage === "envelope" ? { y: "0%" } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden"
            style={{
              left: "41.8%",
              top: "11.5%",
              width: "39.7%",
              height: "58%",
              transform: "rotate(11.2deg) scale(1.02)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COUPLE_PHOTO}
              alt="Couple"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Envelope image on top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ENVELOPE_IMG}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
          />

          {/* Clickable wax seal */}
          <button
            type="button"
            onClick={handleSealClick}
            aria-label="Open envelope"
            className="absolute z-10 rounded-full"
            style={{
              left: "50.66%",
              top: "70.88%",
              width: "13%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
            }}
          >
            {!envelopeOpened && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-[#d6b56d]"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </button>
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            stage === "envelope"
              ? { opacity: envelopeOpened ? 0 : 1, y: 0 }
              : {}
          }
          transition={{ duration: 1, delay: envelopeOpened ? 0 : 1.1 }}
          className="mt-2 text-center"
        >
          <h1
            className="text-[26px] leading-[1.15] tracking-wide text-[#54212a] sm:text-[32px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {NAME_ONE} &amp; {NAME_TWO}
          </h1>
        </motion.div>

      </section>

    </div>
  );
}
