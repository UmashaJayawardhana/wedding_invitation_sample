"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { Noto_Serif_Sinhala, Playfair_Display } from "next/font/google";

const sinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "600", "700"],
});
const serif = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

/* ---------------- settings ---------------- */
const VIDEO_SRC = "/videos/wedding3/open.mp4";
const SINHALA_AT_MS = 5000; // Sinhala blessing appears after 5s
const VIDEO_MS = 10000; // 10s video duration
const SLOW_OPEN_SECONDS = 2.5;

// Sinhala text
const BLESSING = "ශ්‍රී සුබ මංගලම්";
const SUB_HEADING = "අපේ මංගල ආරාධනාව";
const CONNECTOR = "සහ";
const BUTTON_TEXT = "විවෘත කරන්න";

type Props = {
  names: [string, string];
  dateText: string;
  onOpen: () => void;
  videoSrc?: string;
};

/**
 * Ensures couple names are in Sinhala script.
 */
function toSinhalaName(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  const directMap: Record<string, string> = {
    Nishadi: "නිශාදි",
    nishadi: "නිශාදි",
    Viraj: "විරාජ්",
    viraj: "විරාජ්",
  };
  return directMap[trimmed] || trimmed;
}

export default function Opening({ names, onOpen, videoSrc = VIDEO_SRC }: Props) {
  const [phase, setPhase] = useState<"video" | "end">("video");
  const [showBlessing, setShowBlessing] = useState(false);
  const [opened, setOpened] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sinhalaNames = useMemo<[string, string]>(() => {
    return [
      toSinhalaName(names[0]),
      toSinhalaName(names[1]),
    ];
  }, [names]);

  const endVideo = useCallback(() => {
    videoRef.current?.pause();
    setShowBlessing(true);
    setPhase("end");
  }, []);

  // Timers triggered when video starts
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    timers.current.push(
      setTimeout(() => setShowBlessing(true), SINHALA_AT_MS),
      setTimeout(endVideo, VIDEO_MS)
    );
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
              className="pointer-events-none absolute inset-0 bg-black/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: ended ? 0.5 : 0 }}
              transition={{ duration: 1.5 }}
            />

            {/* Sinhala blessing during video (after 5s) */}
            <AnimatePresence>
              {showBlessing && !ended && (
                <motion.div
                  key="blessing-banner"
                  initial={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="absolute inset-x-0 top-[12%] z-20 px-6 text-center"
                >
                  <p
                    className={`${sinhala.className} text-3xl font-semibold tracking-wide text-[#ffe3b0] sm:text-4xl`}
                    style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85)" }}
                  >
                    {BLESSING}
                  </p>
                  <p
                    className={`${sinhala.className} mt-2 text-xs font-medium tracking-wider text-[#fff0df]/95`}
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
                  >
                    {SUB_HEADING}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* When video completes: Sinhala Blessing + Names + Open Button */}
            <AnimatePresence>
              {ended && (
                <motion.div
                  key="end-screen"
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  {/* Top Sinhala blessing */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.9 }}
                    className="mb-8"
                  >
                    <p
                      className={`${sinhala.className} text-2xl font-semibold tracking-wide text-[#ffe3b0] drop-shadow-md sm:text-3xl`}
                    >
                      {BLESSING}
                    </p>
                    <p className={`${sinhala.className} mt-1.5 text-xs font-medium tracking-wider text-[#ffe3b0]/85`}>
                      {SUB_HEADING}
                    </p>
                  </motion.div>

                  {/* Couple names rendered in Sinhala */}
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className={`${sinhala.className} text-4xl font-semibold leading-relaxed text-white drop-shadow-lg sm:text-6xl`}
                  >
                    {sinhalaNames[0]}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className={`${sinhala.className} my-2 text-2xl font-normal text-[#ffe3b0] sm:text-3xl`}
                  >
                    {CONNECTOR}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className={`${sinhala.className} text-4xl font-semibold leading-relaxed text-white drop-shadow-lg sm:text-6xl`}
                  >
                    {sinhalaNames[1]}
                  </motion.h1>

                  {/* Open button in Sinhala */}
                  <motion.button
                    type="button"
                    onClick={open}
                    aria-label={BUTTON_TEXT}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 140, damping: 14 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative mt-10 flex items-center gap-3 rounded-full border border-[#ffd9a0]/80 bg-white/15 px-7 py-3.5 text-[#ffe3b0] shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-[#ffd9a0] hover:bg-white/25"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#ffd9a0]"
                      animate={{ scale: [1, 1.28], opacity: [0.75, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <MailOpen size={22} className="transition-transform group-hover:scale-110" />
                    <span className={`${sinhala.className} text-sm font-semibold tracking-wide text-white`}>
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
