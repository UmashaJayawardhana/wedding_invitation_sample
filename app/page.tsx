"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Heart,
  Sparkles,
  CalendarDays,
  MapPin,
  Clock,
  Volume2,
  Home,
  Image as ImageIcon,
  MessageCircle,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import Opening from "../src/components/opening";

/* ============================================================
   EDIT YOUR DETAILS HERE
============================================================ */
const COUPLE = { one: "Nethmi", two: "Kasun" };
const EVENT = {
  // Asia/Colombo time (UTC+05:30)
  startISO: "2026-12-20T10:00:00+05:30",
  endISO: "2026-12-20T17:00:00+05:30",
  dateText: "20 December 2026",
  timeText: "10:00 AM onwards",
  venue: "Beautiful Wedding Venue",
  mapUrl: "https://maps.google.com/?q=Colombo",
};
const WHATSAPP_NUMBER = ""; // e.g. "94771234567" – RSVP is sent here
const MUSIC_SRC = "/audio/song.mp3"; // optional background music
const ENDING_IMAGE = "/images/ending.jpg"; // background of the "Thank You" section
const GALLERY = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

export default function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    window.scrollTo({ top: 0 });
    setOpened(true);
    // The click on the seal counts as a user gesture, so music may start
    const a = audioRef.current;
    if (a) {
      a.volume = 0.5;
      a.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    }
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (musicOn) {
      a.pause();
      setMusicOn(false);
    } else {
      a.play().then(() => setMusicOn(true)).catch(() => {});
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#5d4a3d]">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Opening onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ScrollBar />
            <MusicButton on={musicOn} onClick={toggleMusic} />
            <BottomNav />
            <Hero />
            <Message />
            <Countdown />
            <Details />
            <Gallery />
            <Rsvp />
            <Ending />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ============================================================
   Scroll progress bar
============================================================ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#d6b56d] to-[#8b2a3a]"
    />
  );
}

/* ============================================================
   Bottom navigation (icons only, 5 items)
============================================================ */
const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "invitation", label: "Invitation", Icon: Heart },
  { id: "venue", label: "Date and venue", Icon: MapPin },
  { id: "gallery", label: "Gallery", Icon: ImageIcon },
  { id: "rsvp", label: "Guest messages", Icon: MessageCircle },
];

function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 120, damping: 18 }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      aria-label="Sections"
    >
      <ul className="flex items-center gap-1 rounded-full border border-[#d6b56d]/60 bg-[#641725]/90 px-2 py-2 shadow-xl backdrop-blur">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className="relative flex h-11 w-11 items-center justify-center rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[#d6b56d]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <motion.span
                  whileTap={{ scale: 0.8 }}
                  className={`relative ${isActive ? "text-[#641725]" : "text-[#f5e6c4]"}`}
                >
                  <Icon size={20} fill={id === "invitation" && isActive ? "currentColor" : "none"} />
                </motion.span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

/* ============================================================
   Floating music button
============================================================ */
function MusicButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      aria-label={on ? "Mute music" : "Play music"}
      className="fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b56d] bg-[#641725]/90 text-[#f5e6c4] shadow-lg backdrop-blur"
    >
      {on && (
        <motion.span
          className="absolute inset-0 rounded-full border border-[#d6b56d]"
          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      {on ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
}

/* ============================================================
   Hero with parallax + floating hearts
============================================================ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 73) % 100,
        size: 10 + ((i * 7) % 18),
        delay: (i * 0.9) % 8,
        duration: 9 + ((i * 3) % 7),
      })),
    []
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-10 -bottom-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="Wedding" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute bottom-[-40px] text-white/60"
            style={{ left: `${h.left}%` }}
            animate={{ y: [0, -900], opacity: [0, 0.9, 0], x: [0, 20, -20, 0] }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={h.size} fill="currentColor" />
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 px-6 text-center text-white"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5 text-sm uppercase tracking-[0.4em]"
        >
          Together With Their Families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.02em" }}
          transition={{ duration: 1.4 }}
          className="font-serif text-5xl md:text-7xl"
        >
          {COUPLE.one}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-4 text-3xl text-[#e3c783]"
        >
          &
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.02em" }}
          transition={{ delay: 0.3, duration: 1.4 }}
          className="font-serif text-5xl md:text-7xl"
        >
          {COUPLE.two}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-7 text-lg"
        >
          {EVENT.dateText}
        </motion.p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="mt-12 text-[10px] tracking-[0.3em] text-white/80"
        >
          SCROLL
          <div className="mx-auto mt-2 h-10 w-px bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Message
============================================================ */
function Message() {
  return (
    <section id="invitation" className="bg-[#f7f1e8] px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-6 inline-block text-[#d6b56d]"
        >
          <Sparkles size={28} />
        </motion.div>

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a98b59]">
          A Beautiful Beginning
        </p>
        <h2 className="mb-8 font-serif text-4xl md:text-5xl">We’re Getting Married</h2>
        <p className="leading-8 text-[#76675c]">
          Two hearts, two families and one beautiful journey. We would be
          delighted to have you with us as we celebrate our special day.
        </p>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Live countdown
============================================================ */
function Countdown() {
  const target = useMemo(() => new Date(EVENT.startISO).getTime(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const units = [
    { label: "Days", value: Math.floor(diff / 86400000) },
    { label: "Hours", value: Math.floor((diff / 3600000) % 24) },
    { label: "Minutes", value: Math.floor((diff / 60000) % 60) },
    { label: "Seconds", value: Math.floor((diff / 1000) % 60) },
  ];

  return (
    <section className="bg-[#641725] px-6 py-20 text-center text-white">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#e3c783]">
        Counting Down
      </p>
      <h2 className="mb-10 font-serif text-3xl md:text-4xl">Until We Say “I Do”</h2>

      <div className="mx-auto grid max-w-xl grid-cols-4 gap-3">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="rounded-2xl border border-[#d6b56d]/40 bg-white/5 py-5 backdrop-blur"
          >
            <div className="relative h-10 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={u.value}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-3xl tabular-nums md:text-4xl"
                >
                  {String(u.value).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#e3c783]">
              {u.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Event details (3D tilt cards + calendar + directions)
============================================================ */
function TiltCard({
  icon,
  title,
  text,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
}) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: -py * 14, y: px * 14 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-3xl border border-[#e8dcc9] bg-[#fffdf9] p-8 shadow-sm"
      >
        <div className="mb-5 flex justify-center text-[#d6b56d]">{icon}</div>
        <h3 className="mb-3 font-serif text-2xl">{title}</h3>
        <p className="text-sm text-[#76675c]">{text}</p>
      </motion.div>
    </motion.div>
  );
}

function Details() {
  const addToCalendar = () => {
    const f = (iso: string) =>
      new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${f(EVENT.startISO)}`,
      `DTEND:${f(EVENT.endISO)}`,
      `SUMMARY:${COUPLE.one} & ${COUPLE.two} Wedding`,
      `LOCATION:${EVENT.venue}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="venue" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a98b59]">
          Save The Date
        </p>
        <h2 className="mb-12 font-serif text-4xl">Wedding Celebration</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <TiltCard delay={0} icon={<CalendarDays size={28} />} title="Date" text={EVENT.dateText} />
          <TiltCard delay={0.15} icon={<Clock size={28} />} title="Time" text={EVENT.timeText} />
          <TiltCard delay={0.3} icon={<MapPin size={28} />} title="Venue" text={EVENT.venue} />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <motion.button
            type="button"
            onClick={addToCalendar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-[#d6b56d] px-7 py-3 text-sm tracking-wider text-[#641725]"
          >
            ADD TO CALENDAR
          </motion.button>
          <motion.a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#641725] px-7 py-3 text-sm tracking-wider text-[#f5e6c4]"
          >
            GET DIRECTIONS
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Gallery with lightbox (click, arrows, keyboard, swipe)
============================================================ */
function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const go = (d: number) =>
    setActive((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="gallery" className="bg-[#f7f1e8] px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a98b59]">Our Memories</p>
        <h2 className="mb-12 font-serif text-4xl">Wedding Moments</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04, rotate: i % 2 ? 1.5 : -1.5 }}
              whileTap={{ scale: 0.97 }}
              className="aspect-square overflow-hidden rounded-2xl shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Wedding moment ${i + 1}`} className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
        <p className="mt-6 text-xs tracking-widest text-[#a98b59]">TAP A PHOTO TO VIEW</p>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-white/80 hover:text-white"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 text-white/80 hover:text-white md:left-8"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 text-white/80 hover:text-white md:right-8"
            >
              <ChevronRight size={40} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={GALLERY[active]}
                alt=""
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
                className="max-h-[85vh] max-w-full rounded-xl object-contain"
              />
            </AnimatePresence>

            <p className="absolute bottom-5 text-xs tracking-widest text-white/70">
              {active + 1} / {GALLERY.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   RSVP
============================================================ */
function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length > 1 && attending !== null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const msg = attending
      ? `Hi! This is ${name}. I will be attending the wedding of ${COUPLE.one} & ${COUPLE.two} with ${guests} guest(s). ${note}`
      : `Hi! This is ${name}. Sorry, I can't make it to the wedding of ${COUPLE.one} & ${COUPLE.two}. ${note}`;
    if (WHATSAPP_NUMBER) {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }
    setSent(true);
  };

  return (
    <section id="rsvp" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a98b59]">Kindly Reply</p>
        <h2 className="mb-10 font-serif text-4xl">RSVP</h2>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-[#e8dcc9] bg-[#fffdf9] p-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#d6b56d] text-white"
              >
                <Check size={30} />
              </motion.div>
              <h3 className="mb-2 font-serif text-2xl">Thank You, {name}!</h3>
              <p className="text-sm text-[#76675c]">
                {attending
                  ? "We can't wait to celebrate with you."
                  : "We'll miss you, and thank you for letting us know."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5 rounded-3xl border border-[#e8dcc9] bg-[#fffdf9] p-8 text-left"
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-[#a98b59]">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-[#e8dcc9] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d6b56d] focus:ring-2 focus:ring-[#d6b56d]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: true, label: "Joyfully Accept" },
                  { v: false, label: "Regretfully Decline" },
                ].map((o) => (
                  <motion.button
                    key={String(o.v)}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAttending(o.v)}
                    className={`rounded-xl border px-3 py-3 text-xs tracking-wide transition ${
                      attending === o.v
                        ? "border-[#641725] bg-[#641725] text-[#f5e6c4]"
                        : "border-[#e8dcc9] bg-white text-[#76675c]"
                    }`}
                  >
                    {o.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {attending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="mb-2 block text-xs uppercase tracking-widest text-[#a98b59]">
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-center gap-6">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b56d] text-[#641725]"
                        aria-label="Fewer guests"
                      >
                        <Minus size={16} />
                      </button>
                      <motion.span
                        key={guests}
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1 }}
                        className="w-8 text-center font-serif text-3xl"
                      >
                        {guests}
                      </motion.span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(10, g + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b56d] text-[#641725]"
                        aria-label="More guests"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-[#a98b59]">
                  Wishes (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Leave a message for the couple"
                  className="w-full resize-none rounded-xl border border-[#e8dcc9] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d6b56d] focus:ring-2 focus:ring-[#d6b56d]/30"
                />
              </div>

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.03 } : {}}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                className="w-full rounded-full bg-[#641725] py-3 text-sm tracking-[0.25em] text-[#f5e6c4] transition disabled:opacity-40"
              >
                SEND RSVP
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================================================
   Ending
============================================================ */
function Ending() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* Background image with a slow zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.12 }}
        viewport={{ once: false }}
        transition={{ duration: 14, ease: "linear" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ENDING_IMAGE}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/45" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 text-center text-white"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="mb-6 inline-block"
        >
          <Heart size={32} fill="currentColor" />
        </motion.div>
        <h2 className="font-serif text-4xl md:text-6xl">Thank You</h2>
        <p className="mt-5 text-lg">For being part of our beautiful journey.</p>
        <p className="mt-8 font-serif text-2xl">
          {COUPLE.one} & {COUPLE.two}
        </p>
      </motion.div>
    </section>
  );
}
