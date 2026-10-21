"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Wish {
  wish_id: number;
  event_id: number;
  guest_name: string;
  message: string;
  created_at: string;
}

interface GuestWishesProps {
  eventId: number;
  guestName: string;
}

export default function GuestWishes({
  eventId,
  guestName,
}: GuestWishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const [guestNameInput, setGuestNameInput] = useState(guestName);
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Load wishes
  useEffect(() => {
    loadWishes();
  }, [eventId]);

  // Keep name synchronized with Opening screen
  useEffect(() => {
    setGuestNameInput(guestName);
  }, [guestName]);

  const loadWishes = async () => {
    console.log("Loading wishes for event:", eventId);

    setLoading(true);

    const { data: wishes, error: wishError } = await supabase
      .from("wishes")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (wishError) {
      console.error("Error loading wishes:", wishError);
      setError("Unable to load wishes.");
      setLoading(false);
      return;
    }

    console.log("Loaded wishes:", wishes);

    setWishes(wishes || []);
    setLoading(false);
  };

  // Submit wish
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!guestNameInput.trim() || !message.trim()) {
      setError("Please enter your name and message.");
      return;
    }

    setSending(true);
    setError("");

    const { data, error } = await supabase
      .from("wishes")
      .insert([
        {
          event_id: eventId,
          guest_name: guestNameInput.trim(),
          message: message.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding wish:", error);
      setError("Unable to send your wish. Please try again.");
      setSending(false);
      return;
    }

    console.log("Wish added:", data);

    // Add new wish to the top immediately
    setWishes((currentWishes) => [
      data,
      ...currentWishes,
    ]);

    // Clear only the message
    setMessage("");

    setSending(false);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f1e8]">

      {/* ============================= */}
      {/* BACKGROUND IMAGE */}
      {/* ============================= */}

      <div className="absolute inset-y-0 left-4 right-4 z-0 overflow-hidden md:left-[2in] md:right-[2in]">

        <img
          src="/images/wedding1/openbg.jpg"
          alt="Guest wishes background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#f7f1e8]/30" />

      </div>


      {/* ============================= */}
      {/* CONTENT */}
      {/* ============================= */}

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20">

        {/* ============================= */}
        {/* HEADING */}
        {/* ============================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >

          <p className="text-xs uppercase tracking-[0.4em] text-[#8b7355]">
            With love
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#4b3a2f] md:text-5xl">
            Guest Wishes
          </h2>

          <p className="mt-4 text-sm text-[#6b4a3a]">
            Leave a message for the happy couple
          </p>

        </motion.div>


        {/* ============================= */}
        {/* WISH FORM */}
        {/* ============================= */}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl rounded-2xl border border-[#d8c3a5] bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-8"
        >

          {/* Your Name */}
          <div>

            <label
              htmlFor="guestName"
              className="mb-2 block text-sm text-[#6b4a3a]"
            >
              Your Name
            </label>

            <input
              id="guestName"
              type="text"
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-[#c8aa82] bg-white/60 px-4 py-3 text-[#4b3a2f] outline-none placeholder:text-[#9b8060] focus:border-[#7a3e4d]"
            />

          </div>


          {/* Your Wish */}
          <div className="mt-5">

            <label
              htmlFor="message"
              className="mb-2 block text-sm text-[#6b4a3a]"
            >
              Your Wish
            </label>

            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes..."
              rows={5}
              className="w-full resize-none rounded-xl border border-[#c8aa82] bg-white/60 px-4 py-3 text-[#4b3a2f] outline-none placeholder:text-[#9b8060] focus:border-[#7a3e4d]"
            />

          </div>


          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}


          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-xl border border-[#7a3e4d] px-6 py-3 text-sm text-[#7a3e4d] transition hover:bg-[#7a3e4d] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Wish"}
          </button>

        </motion.form>


        {/* ============================= */}
        {/* EXISTING WISHES */}
        {/* ============================= */}

        <div className="mt-16">

          {loading ? (

            <p className="text-center text-sm text-[#8b7355]">
              Loading wishes...
            </p>

          ) : wishes.length === 0 ? (

            <p className="text-center text-sm text-[#8b7355]">
              Be the first to leave a wish 💕
            </p>

          ) : (

            <div className="space-y-5">

              {wishes.map((wish) => (

                <motion.div
                  key={wish.wish_id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#d8c3a5] bg-white/80 p-5 shadow-md backdrop-blur-sm"
                >

                  {/* Guest Name */}
                  <p className="font-serif text-xl text-[#7a3e4d]">
                    {wish.guest_name}
                  </p>

                  {/* Wish Message */}
                  <p className="mt-2 text-sm leading-7 text-[#6b4a3a]">
                    {wish.message}
                  </p>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}