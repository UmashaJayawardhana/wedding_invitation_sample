"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Minus,
  Plus,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Great_Vibes, Noto_Serif_Sinhala, Playfair_Display } from "next/font/google";
import Opening from "@/components/wedding3/opening";

const script = Great_Vibes({ subsets: ["latin"], weight: "400" });
const serif = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"] });
const sinhala = Noto_Serif_Sinhala({ subsets: ["sinhala"], weight: ["400", "600", "700"] });

/* ============================================================
   EDIT YOUR DETAILS HERE  (names are kept in the code)
============================================================ */
const COUPLE = { one: "නිශාදි", two: "විරාජ්" };

const EVENT = {
  id: 7, // event_id in your Supabase tables – wishes & RSVPs are saved against it
  dateISO: "2026-11-22T09:00:00+05:30", // Sri Lanka time (9:00 AM)
  timeDisplay: "9:00 AM - 4:00 PM (Poruwa 9:24 AM)",
  venue: "Hotel Green Court, Homagama",
  mapUrl: "https://maps.google.com/?q=Hotel+Green+Court+Homagama",
  message:
    "Join us to celebrate our wedding day with love, laughter and blessings as we begin our forever.",
};

// Optional WhatsApp number for notification backup (e.g. "94771234567"). RSVP is also saved to Supabase for event 7.
const WHATSAPP_NUMBER = "";

// Background music for the invitation
const MUSIC_SRC = "/audio/wedding3/handawaka-various-artists.mp3";

// 3 photos for Our Story – in /public/images/wedding3
const CHAPTERS = [
  {
    title: "Our Story",
    caption: "Two hearts, one beautiful journey.",
    photos: [
      "/images/wedding3/preshhot (1).jpeg",
      "/images/wedding3/preshhot (2).jpeg",
      "/images/wedding3/preshhot (3).jpeg",
    ],
  },
];

/* ============================================================
   Supabase Database Types
============================================================ */
export interface WeddingInvitationRecord {
  wedding_invitation_id: number;
  event_id: number;
  guest_name: string;
  guest_token?: string;
  invitation_type: string;
  number_of_guests: number;
  rsvp_status: "pending" | "accepted" | "declined" | string;
  attending_count: number | null;
  responded_at: string | null;
  wish_message: string | null;
  wish_created_at: string | null;
  created_at?: string;
}

interface Wish {
  wish_id: number;
  guest_name: string;
  message: string;
  created_at: string;
}

let _sb: SupabaseClient | null = null;
function getSb(): SupabaseClient | null {
  if (_sb) return _sb;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _sb = createClient(url, key);
  return _sb;
}

// Calm, charming cream backgrounds
const CREAM_MAIN = "linear-gradient(180deg, #fdfbf7 0%, #f8f3e8 40%, #f4ece0 75%, #efe4d3 100%)";
const CREAM_HERO = "linear-gradient(180deg, #fbf7f1 0%, #f8ebd9 30%, #f5dfc6 60%, #eed2b9 85%, #fdfbf7 100%)";

/* ============================================================
   Page Component with URL Route Parameters
============================================================ */
interface PageProps {
  params: Promise<{
    eventId?: string;
    invitationtype?: string;
    guestname?: string;
  }>;
}

export default function WeddingPage({ params }: PageProps) {
  const rawParams = (use(params) || {}) as Record<string, string | undefined>;

  const rawEventId = rawParams.eventId || "";
  const rawTypeParam = rawParams.invitationtype || "";
  const rawGuestParam = rawParams.guestname || "";

  const eventIdNum = Number(rawEventId) || EVENT.id;

  const decodedGuestName = rawGuestParam
    ? decodeURIComponent(rawGuestParam).trim()
    : "";

  const cleanParamType = decodeURIComponent(rawTypeParam).trim().toLowerCase();
  const initialType = cleanParamType.includes("family")
    ? "family"
    : cleanParamType.includes("couple")
    ? "couple"
    : "single";

  const defaultGuestCount = initialType === "family" ? 4 : initialType === "couple" ? 2 : 1;

  const [revealed, setRevealed] = useState(false);
  const [guestName, setGuestName] = useState(decodedGuestName || "Guest");
  const [invitationType, setInvitationType] = useState<string>(initialType);
  const [invitation, setInvitation] = useState<WeddingInvitationRecord | null>(null);
  const [guestCount, setGuestCount] = useState<number>(defaultGuestCount);

  // Load invitation record from Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadInvitation() {
      const sb = getSb();
      if (!sb) return;

      try {
        let found: WeddingInvitationRecord | null = null;

        // 1. If rawEventId is a numeric ID, try finding by wedding_invitation_id first
        const num = Number(rawEventId);
        if (!isNaN(num) && num > 0) {
          const { data, error } = await sb
            .from("wedding_invitations")
            .select("*")
            .eq("wedding_invitation_id", num)
            .maybeSingle();

          if (!error && data) {
            found = data as WeddingInvitationRecord;
          }
        }

        // 2. Try finding by event_id + guest_name
        if (!found && decodedGuestName && decodedGuestName !== "Guest") {
          const primaryName = decodedGuestName.split(/[&+]|\band\b|\bfamily\b/i)[0].trim();
          const { data, error } = await sb
            .from("wedding_invitations")
            .select("*")
            .eq("event_id", eventIdNum)
            .ilike("guest_name", `%${primaryName || decodedGuestName}%`)
            .maybeSingle();

          if (!error && data) {
            found = data as WeddingInvitationRecord;
          }
        }

        // 3. Try finding by guest_token
        if (!found && rawEventId) {
          const { data, error } = await sb
            .from("wedding_invitations")
            .select("*")
            .eq("guest_token", rawEventId)
            .maybeSingle();

          if (!error && data) {
            found = data as WeddingInvitationRecord;
          }
        }

        if (isMounted && found) {
          setInvitation(found);
          if (found.guest_name) {
            setGuestName(found.guest_name);
          }
          if (found.number_of_guests) {
            setGuestCount(found.number_of_guests);
          }
          if (found.invitation_type) {
            const dbType = found.invitation_type.trim().toLowerCase();
            if (dbType.includes("family")) setInvitationType("family");
            else if (dbType.includes("couple")) setInvitationType("couple");
            else setInvitationType("single");
          }
        }
      } catch (err) {
        console.error("Error loading invitation from Supabase:", err);
      }
    }

    loadInvitation();

    return () => {
      isMounted = false;
    };
  }, [eventIdNum, decodedGuestName, rawEventId]);

  const when = useMemo(() => new Date(EVENT.dateISO), []);
  const dateText = when.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeText = when.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Colombo",
  });

  const [lightbox, setLightbox] = useState<{ c: number; p: number } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <main
      className={`${serif.className} relative min-h-screen overflow-x-hidden text-[#2e241c]`}
      style={{ background: CREAM_MAIN }}
    >
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* Floating background music mute/unmute button on right side */}
      <AnimatePresence>
        {revealed && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            aria-label={isPlaying ? "Mute music" : "Play music"}
            className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#c89e65]/80 bg-white/90 text-[#8c672d] shadow-[0_8px_25px_rgba(70,50,30,0.18)] backdrop-blur-md transition hover:bg-white sm:bottom-8 sm:right-7 sm:h-13 sm:w-13"
          >
            {isPlaying && (
              <motion.span
                className="absolute inset-0 rounded-full border border-[#c89e65]"
                animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} className="text-[#a89282]" />}
          </motion.button>
        )}
      </AnimatePresence>

      <Opening
        names={[COUPLE.one, COUPLE.two]}
        dateText={dateText}
        onOpen={() => {
          window.scrollTo({ top: 0 });
          setRevealed(true);
          const a = audioRef.current;
          if (a) {
            a.volume = 0.5;
            a.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          }
        }}
      />

      <motion.div
        initial={{ opacity: 0, filter: "blur(14px)", scale: 1.05 }}
        animate={revealed ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        {/* ---------------- FIRST PAGE: SRI LANKAN WEDDING BLESSINGS CARD ---------------- */}
        <section
          className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:py-12"
          style={{ background: CREAM_HERO }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={revealed ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <div className="relative aspect-[941/1672] w-full max-w-[min(92vw,calc(90dvh*941/1672))] max-h-[90dvh] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e5d8c5]/80 bg-white shadow-[0_20px_50px_rgba(70,50,30,0.16)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wedding3/Sri Lankan Wedding Blessings.png"
                alt="Sri Lankan Wedding Blessings"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* ---------------- SECOND PAGE: 2PAGE VIDEO & FORMAL INVITATION ---------------- */}
        <SecondPageInvitation isRevealed={revealed} />

        {/* ---------------- CHAPTERS (3 photos each) ---------------- */}
        {CHAPTERS.map((chapter, ci) => (
          <Chapter
            key={chapter.title}
            index={ci}
            chapter={chapter}
            onOpen={(p) => setLightbox({ c: ci, p })}
          />
        ))}

        {/* ---------------- DETAILS & COUNTDOWN (ORIGINAL UNZOOMED PHOTO: BG1 FOR MOBILE VIEW) ---------------- */}
        <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#300503] px-4 py-12 sm:py-16">
          {/* Full unzoomed original photo across screen, perfectly fitted for mobile view */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="h-full w-full max-w-[min(100vw,calc(100dvh*736/1308))] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/wedding3/bg1.jpeg')" }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#ffd9a0]">
              Save The Date
            </p>
            <h2 className={`${script.className} mb-6 text-5xl text-white drop-shadow-lg sm:mb-8 sm:text-6xl`}>
              When &amp; Where
            </h2>

            <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
              {[
                { icon: <CalendarDays size={24} className="sm:h-[26px] sm:w-[26px]" />, title: "Date", text: dateText },
                { icon: <Clock size={24} className="sm:h-[26px] sm:w-[26px]" />, title: "Time", text: EVENT.timeDisplay },
                { icon: <MapPin size={24} className="sm:h-[26px] sm:w-[26px]" />, title: "Venue", text: EVENT.venue },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl sm:rounded-3xl border border-white/25 bg-white/15 p-4 sm:p-7 text-white shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-md"
                >
                  <div className="mb-2 sm:mb-4 flex justify-center text-[#ffd9a0]">{c.icon}</div>
                  <h3 className="mb-1 sm:mb-2 text-lg sm:text-xl font-medium text-white">{c.title}</h3>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-white/90">{c.text}</p>
                </motion.div>
              ))}
            </div>

            <Countdown target={when.getTime()} />

            <motion.a
              href={EVENT.mapUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 sm:mt-10 inline-block rounded-full border border-[#ffd9a0] bg-white/15 px-8 py-3.5 text-xs tracking-[0.25em] text-[#ffe3b0] shadow-lg backdrop-blur-md transition hover:bg-[#ffd9a0] hover:text-[#2e241c]"
            >
              GET DIRECTIONS
            </motion.a>
          </div>
        </section>

        {/* ---------------- RSVP & GUEST WISHES (BG2 REPEATING SEAMLESSLY AS WISHES GROW) ---------------- */}
        <div
          className="relative min-h-[100dvh] w-full bg-[#f0e9d6] bg-repeat-y"
          style={{
            backgroundImage: "url('/images/wedding3/bg2.jpeg')",
            backgroundSize: "min(100vw, 480px) auto",
            backgroundPosition: "top center",
          }}
        >
          <div className="relative z-10">
            {/* ---------------- RSVP (WhatsApp & Database) ---------------- */}
            <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
              <div className="mx-auto max-w-md rounded-3xl border border-[#e5d8c5] bg-white/85 p-6 sm:p-8 shadow-[0_15px_40px_rgba(70,50,30,0.08)] backdrop-blur-md text-[#2e241c]">
                <p className="mb-2 text-center text-xs uppercase tracking-[0.35em] text-[#a67c38]">Kindly reply</p>
                <h2 className={`${script.className} mb-7 text-center text-5xl text-[#2e241c]`}>Will you join us?</h2>
                <Rsvp
                  eventId={eventIdNum}
                  guestName={guestName}
                  onGuestNameChange={setGuestName}
                  guestCount={guestCount}
                  onGuestCountChange={setGuestCount}
                  invitation={invitation}
                />
              </div>
            </section>

            {/* ---------------- WISHES ---------------- */}
            <section className="px-4 pb-24 sm:px-6 sm:pb-28">
              <div className="mx-auto max-w-2xl">
                <p className="mb-2 text-center text-xs uppercase tracking-[0.35em] text-[#a67c38]">Guest wishes</p>
                <h2 className={`${script.className} mb-8 text-center text-5xl text-[#2e241c]`}>Words from the heart</h2>
                <Wishes
                  eventId={eventIdNum}
                  guestName={guestName}
                  onGuestNameChange={setGuestName}
                />
              </div>
            </section>

            <footer className="relative overflow-hidden px-6 pb-12 pt-12 text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b88a44]/40 to-transparent" />
              <p className={`${sinhala.className} text-3xl font-semibold text-[#2e241c]`}>
                {COUPLE.one} සහ {COUPLE.two}
              </p>
              <p className="mt-3 text-xs tracking-[0.3em] text-[#8a796c]">WITH LOVE, JOY &amp; FOREVER</p>
            </footer>
          </div>
        </div>
      </motion.div>

      <Lightbox state={lightbox} setState={setLightbox} />
    </main>
  );
}

/* ============================================================
   Page 2: 2pagevd video + Formal Sinhala Invitation Letter
============================================================ */
function SecondPageInvitation({ isRevealed }: { isRevealed: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });
  const [showText, setShowText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // Play ONLY when the user actually scrolls down and reaches this page
    if (isRevealed && isInView && !startedRef.current) {
      startedRef.current = true;
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }

      // Start 10s timer once that page loads in view
      timerRef.current = setTimeout(() => {
        setShowText(true);
      }, 10000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRevealed, isInView]);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowText(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:py-12"
      style={{ background: CREAM_MAIN }}
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        {/* 9:16 Video Frame */}
        <div className="relative aspect-[9/16] w-full max-w-[min(92vw,calc(90dvh*9/16))] max-h-[90dvh] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e5d8c5]/80 bg-black shadow-[0_20px_50px_rgba(70,50,30,0.16)]">
          {/* Video - NO autoPlay, plays ONLY when that page loads in view. NO blur when ended */}
          <video
            ref={videoRef}
            src="/videos/wedding3/2pagevd.mp4"
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="h-full w-full object-cover"
            style={{
              filter: "none",
            }}
          />

          {/* Text part: spread across the page over the video */}
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 md:p-8"
              >
                <div
                  className={`${sinhala.className} relative w-full max-w-[94%] sm:max-w-[90%] rounded-2xl sm:rounded-3xl border border-[#e5d8c5]/90 bg-white/85 p-5 sm:p-7 md:p-9 text-center shadow-[0_20px_50px_rgba(50,35,20,0.25)] backdrop-blur-md`}
                >
                  {/* Couple Names */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#8c672d] tracking-wide mb-2 sm:mb-3">
                    නිශාදි සහ විරාජ්
                  </h2>

                  {/* Parents */}
                  <div className="space-y-1 text-xs sm:text-sm md:text-base text-[#4a3d34] leading-relaxed">
                    <p>පී ඒ අනුර ජයන්ත මහතා සහ එම මැතිණියගේ ආදරණීය දියණිය</p>
                    <p className="text-[#a67c38] font-medium my-0.5">සහ</p>
                    <p>එම් ඩී සිරිශාන්ත මහතා සහ එම මැතිණියගේ ආදරණීය පුත්</p>
                  </div>

                  <p className="my-2.5 sm:my-3 text-xs sm:text-sm md:text-base font-medium text-[#7a6452] tracking-wide">
                    අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන්
                  </p>

                  {/* Date, Time & Poruwa */}
                  <div className="my-2.5 sm:my-3 py-2 sm:py-2.5 border-y border-[#e5d8c5] max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg font-semibold text-[#8c672d]">
                      <span>2026</span>
                      <span>නොවැම්බර</span>
                      <span>22</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4a3d34] mt-1">
                      ඉරිදා දින පෙව 9 සිට පව 4 දක්වා
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#a67c38] font-medium mt-0.5">
                      (පෝරුව චාරිත්‍ර පෙව 9.24)
                    </p>
                  </div>

                  {/* Venue & Invitation */}
                  <div className="space-y-1 text-xs sm:text-sm md:text-base text-[#4a3d34] leading-relaxed">
                    <p className="font-semibold text-[#2e241c] text-sm sm:text-base md:text-lg">
                      Hotel Green Court Homagama
                    </p>
                    <p className="text-[#6d5b4b]">පරිශ්‍රයේ පැවැත්වෙන</p>
                    <p className="font-medium text-[#2e241c] pt-1">
                      මංගල උත්සවයට සහභාගි වන මෙන් ගෞරවයෙන් ආරාධනය කරන්නෙමු.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Chapter with 3 photos
============================================================ */
function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#ebd2b9] to-[#d8af93] text-[#8c672d] ${className ?? ""}`}>
        <Heart size={28} fill="currentColor" />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />;
}

const TILTS = [-4, 2, -2];
const DROPS = ["0px", "22px", "8px"];

function Chapter({
  index,
  chapter,
  onOpen,
}: {
  index: number;
  chapter: (typeof CHAPTERS)[number];
  onOpen: (photo: number) => void;
}) {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#a67c38]">
            Moments of Love
          </p>
          <h2 className={`${script.className} text-5xl text-[#2e241c] sm:text-6xl`}>{chapter.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6a5749]">{chapter.caption}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">
          {chapter.photos.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => onOpen(i)}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: TILTS[i] }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
              whileTap={{ scale: 0.97 }}
              style={{ marginTop: DROPS[i] }}
              className="relative overflow-hidden rounded-xl border-[5px] border-white bg-white shadow-[0_12px_28px_rgba(70,50,30,0.12)] sm:border-8"
              aria-label={`${chapter.title} photo ${i + 1}`}
            >
              <Photo src={src} alt={`${chapter.title} ${i + 1}`} className="aspect-[3/4] w-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  state,
  setState,
}: {
  state: { c: number; p: number } | null;
  setState: (s: { c: number; p: number } | null) => void;
}) {
  const photos = state ? CHAPTERS[state.c].photos : [];
  const go = (d: number) =>
    state && setState({ c: state.c, p: (state.p + d + photos.length) % photos.length });

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setState(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
        >
          <button type="button" aria-label="Close" onClick={() => setState(null)} className="absolute right-5 top-5 text-white/80">
            <X size={28} />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 text-white/80 md:left-8"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 text-white/80 md:right-8"
          >
            <ChevronRight size={40} />
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${state.c}-${state.p}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                if (info.offset.x > 80) go(-1);
              }}
            >
              <Photo
                src={photos[state.p]}
                alt=""
                className="max-h-[82vh] max-w-full rounded-xl object-contain"
              />
            </motion.div>
          </AnimatePresence>
          <p className="absolute bottom-5 text-xs tracking-widest text-white/70">
            {CHAPTERS[state.c].title} · {state.p + 1} / {photos.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Countdown
============================================================ */
function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="mt-10 h-20" />;
  const diff = Math.max(0, target - now);
  const units = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor((diff / 3600000) % 24)],
    ["Min", Math.floor((diff / 60000) % 60)],
    ["Sec", Math.floor((diff / 1000) % 60)],
  ] as const;
  return (
    <div className="mx-auto mt-6 sm:mt-10 grid max-w-sm grid-cols-4 gap-2 sm:gap-3">
      {units.map(([label, v]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/25 bg-white/15 py-2.5 sm:py-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.25)] backdrop-blur-md"
        >
          <div className="text-2xl font-semibold tabular-nums text-white">{String(v).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ffd9a0]">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   RSVP – saves RSVP to Supabase (wedding_invitations) & optional WhatsApp
============================================================ */
function Rsvp({
  eventId,
  guestName,
  onGuestNameChange,
  guestCount,
  onGuestCountChange,
  invitation,
}: {
  eventId: number;
  guestName: string;
  onGuestNameChange: (n: string) => void;
  guestCount: number;
  onGuestCountChange: (c: number) => void;
  invitation: WeddingInvitationRecord | null;
}) {
  const [choice, setChoice] = useState<"yes" | "no" | null>(() => {
    if (invitation?.rsvp_status === "accepted") return "yes";
    if (invitation?.rsvp_status === "declined") return "no";
    return null;
  });
  const [count, setCount] = useState<number>(() => {
    return invitation?.attending_count ?? guestCount;
  });
  const [sent, setSent] = useState(Boolean(invitation?.responded_at));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (invitation) {
      if (invitation.rsvp_status === "accepted") setChoice("yes");
      else if (invitation.rsvp_status === "declined") setChoice("no");

      if (invitation.attending_count) setCount(invitation.attending_count);
      else if (invitation.number_of_guests) setCount(invitation.number_of_guests);
    }
  }, [invitation]);

  const send = async () => {
    const trimmed = guestName.trim();
    if (!choice || !trimmed || submitting) return;
    setSubmitting(true);
    setError("");

    const sb = getSb();
    const status = choice === "yes" ? "accepted" : "declined";
    const attendingCount = choice === "yes" ? count : 0;
    const nowISO = new Date().toISOString();

    if (sb) {
      try {
        // 1. If we have a known wedding_invitation_id, update it directly
        if (invitation?.wedding_invitation_id) {
          const { error: updateErr } = await sb
            .from("wedding_invitations")
            .update({
              rsvp_status: status,
              attending_count: attendingCount,
              responded_at: nowISO,
            })
            .eq("wedding_invitation_id", invitation.wedding_invitation_id);

          if (updateErr) {
            console.warn("Could not update invitation directly:", updateErr.message);
          }
        } else {
          // 2. Otherwise search by event_id + guest_name
          const primary = trimmed.split(/[&+]|\band\b|\bfamily\b/i)[0].trim();
          const { data: matched } = await sb
            .from("wedding_invitations")
            .select("wedding_invitation_id")
            .eq("event_id", eventId)
            .ilike("guest_name", `%${primary || trimmed}%`)
            .limit(1);

          if (matched && matched.length > 0) {
            await sb
              .from("wedding_invitations")
              .update({
                rsvp_status: status,
                attending_count: attendingCount,
                responded_at: nowISO,
              })
              .eq("wedding_invitation_id", matched[0].wedding_invitation_id);
          } else {
            // If not found, attempt insert into wedding_invitations
            await sb
              .from("wedding_invitations")
              .insert({
                event_id: eventId,
                guest_name: trimmed,
                rsvp_status: status,
                attending_count: attendingCount,
                number_of_guests: choice === "yes" ? count : 1,
                responded_at: nowISO,
              });
          }
        }
      } catch (err) {
        console.error("Supabase RSVP error:", err);
      }
    }

    // Backup notification via WhatsApp if WHATSAPP_NUMBER is configured
    if (WHATSAPP_NUMBER) {
      const text =
        choice === "yes"
          ? `Hi! This is ${trimmed}. We are coming to the wedding of ${COUPLE.one} & ${COUPLE.two} 🌅 Guests: ${count}.`
          : `Hi! This is ${trimmed}. Sorry, we can't make it to the wedding of ${COUPLE.one} & ${COUPLE.two}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    }

    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#c89e65] to-[#b38243] text-white shadow-md">
          <Check size={26} />
        </div>
        <h3 className="mb-2 text-2xl text-[#2e241c]">{choice === "yes" ? "We can’t wait to see you!" : "We’ll miss you"}</h3>
        <p className="text-sm text-[#6a5749]">Your RSVP has been recorded. Thank you!</p>
        <button type="button" onClick={() => setSent(false)} className="mt-5 text-xs tracking-[0.2em] text-[#8c672d] underline underline-offset-4">
          CHANGE MY REPLY
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <input
        value={guestName}
        onChange={(e) => onGuestNameChange(e.target.value)}
        maxLength={60}
        placeholder="Your name"
        className="w-full rounded-2xl border border-[#dfd3c1] bg-[#fdfbf7] px-4 py-3 text-sm text-[#2e241c] outline-none placeholder:text-[#9e8f80] focus:border-[#b88a44]"
      />
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["yes", "We’re coming 🌅"],
            ["no", "Regretfully decline"],
          ] as const
        ).map(([v, label]) => (
          <motion.button
            key={v}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setChoice(v)}
            className={`rounded-2xl border px-3 py-4 text-sm transition ${choice === v
                ? v === "yes"
                  ? "border-[#b88a44] bg-gradient-to-br from-[#c89e65] to-[#b38243] text-white shadow-md"
                  : "border-[#4a3d34] bg-[#4a3d34] text-white shadow-md"
                : "border-[#dfd3c1] bg-[#fbf8f2] text-[#5a4a3e] hover:bg-white"
              }`}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {choice === "yes" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-[#a67c38]">How many will attend?</p>
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="Fewer"
                onClick={() => {
                  const newC = Math.max(1, count - 1);
                  setCount(newC);
                  onGuestCountChange(newC);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd3c1] text-[#2e241c] hover:bg-[#f5eee3]"
              >
                <Minus size={16} />
              </button>
              <motion.span key={count} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-10 text-center text-4xl text-[#2e241c]">
                {count}
              </motion.span>
              <button
                type="button"
                aria-label="More"
                onClick={() => {
                  const maxAllowed = Math.max(20, (invitation?.number_of_guests ?? 4));
                  const newC = Math.min(maxAllowed, count + 1);
                  setCount(newC);
                  onGuestCountChange(newC);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfd3c1] text-[#2e241c] hover:bg-[#f5eee3]"
              >
                <Plus size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        disabled={!choice || !guestName.trim() || submitting}
        onClick={send}
        whileTap={{ scale: 0.97 }}
        className="w-full rounded-full bg-gradient-to-r from-[#c89e65] to-[#b38243] py-3 text-sm tracking-[0.25em] text-white shadow-md transition hover:brightness-105 disabled:opacity-40"
      >
        {submitting ? "RECORDING..." : "CONFIRM"}
      </motion.button>
      {error && <p className="text-center text-xs text-[#b83838]">{error}</p>}
    </div>
  );
}

/* ============================================================
   Guest wishes – saved in the Supabase `wishes` table (event_id)
============================================================ */
function ago(iso: string) {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 86400)} d ago`;
  return `${Math.floor(s / 86400)} d ago`;
}

const WISH_COLUMNS = "wish_id, guest_name, message, created_at";

function Wishes({
  eventId,
  guestName,
  onGuestNameChange,
}: {
  eventId: number;
  guestName: string;
  onGuestNameChange: (n: string) => void;
}) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [thanks, setThanks] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const load = async () => {
    const sb = getSb();
    if (!sb) return;
    const { data } = await sb
      .from("wishes")
      .select(WISH_COLUMNS)
      .eq("event_id", eventId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setWishes(data as Wish[]);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30000); // pick up other guests' wishes
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const sb = getSb();
    const n = guestName.trim();
    const m = message.trim();
    if (!sb) return setError("Wishes are not available right now.");
    if (!n || !m || busy || cooldown) return;
    setBusy(true);
    setError("");
    const { data, error } = await sb
      .from("wishes")
      .insert({ event_id: eventId, guest_name: n, message: m })
      .select(WISH_COLUMNS)
      .single();
    setBusy(false);
    if (error) return setError("Sorry, we couldn’t save your wish. Please try again.");
    setWishes((w) => [data as Wish, ...w]);
    setMessage("");
    setThanks(true);

    // Also sync wish with wedding_invitations if record exists for this guest
    try {
      const primary = n.split(/[&+]|\band\b|\bfamily\b/i)[0].trim();
      await sb
        .from("wedding_invitations")
        .update({
          wish_message: m,
          wish_created_at: new Date().toISOString(),
        })
        .eq("event_id", eventId)
        .ilike("guest_name", `%${primary || n}%`);
    } catch {
      // Non-blocking
    }

    setCooldown(true); // small pause so the wall isn't spammed
    setTimeout(() => setThanks(false), 3500);
    setTimeout(() => setCooldown(false), 15000);
  };

  return (
    <div>
      <form onSubmit={send} className="space-y-3">
        <input
          value={guestName}
          onChange={(e) => onGuestNameChange(e.target.value)}
          maxLength={60}
          placeholder="Your name"
          className="w-full rounded-2xl border border-[#dfd3c1] bg-[#fdfbf7] px-4 py-3 text-sm text-[#2e241c] outline-none placeholder:text-[#9e8f80] focus:border-[#b88a44]"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Write your wishes for the couple…"
          className="w-full resize-none rounded-2xl border border-[#dfd3c1] bg-[#fdfbf7] px-4 py-3 text-sm text-[#2e241c] outline-none placeholder:text-[#9e8f80] focus:border-[#b88a44]"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8a796c]">{message.length}/500</span>
          <motion.button
            type="submit"
            disabled={busy || cooldown || !message.trim() || !guestName.trim()}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c89e65] to-[#b38243] px-6 py-2.5 text-xs tracking-[0.2em] text-white shadow-sm hover:brightness-105 disabled:opacity-40"
          >
            {busy ? "SENDING…" : "SEND WISH"} <Send size={14} />
          </motion.button>
        </div>
        {error && <p className="text-sm text-[#b83838]">{error}</p>}
        <AnimatePresence>
          {thanks && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-medium text-[#8c672d]">
              Thank you! Your wish is now on the wall 💛
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <div className="mt-10 space-y-4">
        {wishes.length === 0 && <p className="text-center text-sm text-[#8a796c]">Be the first to leave a wish ✨</p>}
        <AnimatePresence initial={false}>
          {wishes.map((w) => (
            <motion.div
              key={w.wish_id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="rounded-2xl border border-[#e5d8c5] bg-white/80 p-5 text-left shadow-[0_4px_16px_rgba(70,50,30,0.04)] backdrop-blur"
            >
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#4a3d34]">{w.message}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-medium tracking-wider text-[#a67c38]">— {w.guest_name}</span>
                <span className="text-[#998777]">{ago(w.created_at)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}


