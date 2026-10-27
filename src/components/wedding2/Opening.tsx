
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Play, SkipForward, Waves } from "lucide-react";

interface OpeningProps {
  onOpen: () => void;
}

export default function Opening({ onOpen }: OpeningProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.play().catch(() => {
      setVideoError(true);
      setVideoFinished(true);
    });
  }, []);

  const skipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setVideoFinished(true);
  };

  return (
    <section className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#173c4b] text-center">
      {/* Opening video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        src="/videos/wedding2/opening.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVideoFinished(true)}
        onError={() => {
          setVideoError(true);
          setVideoFinished(true);
        }}
      />

      {/* Sea and sunset overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#153b50]/20 via-[#8c625e]/10 to-[#102f40]/50" />

      {/* Sunset glow and waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f7c69b]/25 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-8 left-0 right-0 flex justify-center text-[#f5d8bd]/50"
        >
          <Waves size={100} strokeWidth={0.6} />
        </motion.div>
      </div>

      {/* Skip button */}
      <AnimatePresence>
        {!videoFinished && !videoError && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={skipVideo}
            className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/50 bg-black/25 px-5 py-2.5 text-xs tracking-wider text-white backdrop-blur-md sm:right-8 sm:top-8"
          >
            Skip <SkipForward size={15} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Invitation panel */}
      <AnimatePresence>
        {videoFinished && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 mx-4 flex max-h-[90dvh] w-full max-w-md flex-col items-center overflow-y-auto rounded-[2rem] border border-[#f5d8bd]/40 bg-[#173c4b]/80 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-12 sm:py-12"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart
                size={30}
                strokeWidth={1}
                className="text-[#f7d1b0]"
              />
            </motion.div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.35em] text-[#f8dfc8]">
              Together with their families
            </p>

            <h1 className="mt-4 font-serif text-4xl font-normal text-white sm:text-5xl">
              Our Wedding
            </h1>

            <p className="mt-4 font-serif text-lg italic text-[#f7d1b0]">
              A beautiful beginning by the sea
            </p>

            <div className="my-5 h-px w-16 bg-[#f5d8bd]/70" />

            <p className="max-w-xs text-sm leading-7 text-white/90">
              A day filled with love, a sunset to remember, and memories to
              cherish forever.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpen}
              className="mt-7 flex items-center gap-3 rounded-full border border-[#f5d8bd] bg-[#f5d8bd] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#173c4b] shadow-lg transition-colors hover:bg-[#fff0df]"
            >
              <Play size={15} fill="currentColor" />
              Open Invitation
            </motion.button>

            <p className="mt-5 text-[10px] tracking-[0.25em] text-white/70">
              WITH LOVE, ALWAYS
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
