"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ---------------- settings ---------------- */
const VIDEO_SRC = "/videos/wedding4/open.mp4";
const VIDEO_MS = 10000; // 10s video fallback duration
const SLOW_OPEN_SECONDS = 2.5;

// English text
const SUB_HEADING = "Our Wedding Invitation";
const CONNECTOR = "&";
const BUTTON_TEXT = "Open Invitation";

type Props = {
  names?: [string, string];
  dateText?: string;
  onOpen: () => void;
  videoSrc?: string;
};

export default function Opening({ names = ["VIRAJ", "SACHINI"], dateText, onOpen, videoSrc = VIDEO_SRC }: Props) {
  const [phase, setPhase] = useState<"video" | "end">("video");
  const [opened, setOpened] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const endVideo = useCallback(() => {
    videoRef.current?.pause();
    setPhase("end");
  }, []);

  // Timers triggered when video starts
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    timers.current.push(setTimeout(endVideo, VIDEO_MS));
  }, [endVideo]);

  useEffect(() => {
    // Fallback in case autoplay is blocked or delayed
    const fallback = setTimeout(start, 2500);
    const list = timers.current;
    return () => {
      clearTimeout(fallback);
      list.forEach(clearTimeout);
    };
  }, [start]);

  useEffect(() => {
    if (opened) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [opened]);

  const open = () => {
    setOpened(true);
    onOpen();
  };

  const ended = phase === "end";

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: SLOW_OPEN_SECONDS, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f7f2e8]"
        >
          {/* Subtle ambient cream backdrop behind 9:16 frame for desktop/wide displays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fbf8f2] via-[#f7f0e3] to-[#ede3d1] opacity-95" />

          {/* Locked 9:16 aspect ratio screen container - full video without zoom or crop */}
          <div className="relative flex h-full max-h-[100dvh] w-auto max-w-[calc(100dvh*9/16)] aspect-[9/16] items-center justify-center overflow-hidden bg-black shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {/* Full 9:16 Video - object-contain, NO zoom */}
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              onPlaying={start}
              onEnded={endVideo}
              onError={start}
              className="h-full w-full object-contain"
              style={{
                filter: ended ? "blur(14px)" : "none",
                transform: "none",
                transition: "filter 1.6s ease",
              }}
            />

            {/* Darkening tint when ended */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: ended ? 0.55 : 0 }}
              transition={{ duration: 1.5 }}
            />

            {/* When video completes: Subheading + Names + Open Button */}
            <AnimatePresence>
              {ended && (
                <motion.div
                  key="end-screen"
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  {/* Subheading */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-6"
                  >
                    <p
                      className={`${cormorant.className} text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe3b0]/90 drop-shadow-md sm:text-base`}
                    >
                      {SUB_HEADING}
                    </p>
                    <div className="mx-auto mt-2 h-[1px] w-16 bg-[#ffe3b0]/40" />
                  </motion.div>

                  {/* Couple names rendered in English */}
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.9 }}
                    className={`${cinzel.className} text-3xl font-medium tracking-[0.22em] text-white drop-shadow-lg sm:text-5xl`}
                  >
                    {names[0]}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className={`${cormorant.className} my-2 text-2xl font-light italic text-[#ffe3b0] sm:text-3xl`}
                  >
                    {CONNECTOR}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.9 }}
                    className={`${cinzel.className} text-3xl font-medium tracking-[0.22em] text-white drop-shadow-lg sm:text-5xl`}
                  >
                    {names[1]}
                  </motion.h1>

                  {dateText && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className={`${cormorant.className} mt-3 text-sm tracking-widest text-[#ffe3b0]/80 uppercase`}
                    >
                      {dateText}
                    </motion.p>
                  )}

                  {/* Open Invitation Button */}
                  <motion.button
                    type="button"
                    onClick={open}
                    aria-label={BUTTON_TEXT}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 140, damping: 14 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative mt-10 flex items-center gap-3 rounded-full border border-[#ffd9a0]/80 bg-white/15 px-7 py-3.5 text-[#ffe3b0] shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-[#ffd9a0] hover:bg-white/25"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#ffd9a0]"
                      animate={{ scale: [1, 1.28], opacity: [0.75, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <MailOpen size={20} className="transition-transform group-hover:scale-110" />
                    <span className="text-sm font-semibold tracking-wider text-white uppercase">
                      {BUTTON_TEXT}
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
