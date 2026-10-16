"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Wish {
  gr_invitation_id: number;
  guest_name: string;
  wish_message: string | null;
  wish_created_at: string | null;
}

interface GuestWishProps {
  guestName?: string;
  invitationId: number;
  currentWish?: string | null;
  wishes?: Wish[];
}

export default function GuestWish({
  guestName = "Guest",
  invitationId,
  currentWish = null,
  wishes: initialWishes = [],
}: GuestWishProps) {
  const [message, setMessage] = useState(
    currentWish ?? ""
  );

  const [submitted, setSubmitted] = useState(
    Boolean(currentWish)
  );

  const [wishes, setWishes] = useState<Wish[]>(
    initialWishes.filter(
      (wish) =>
        wish.wish_message &&
        wish.wish_message.trim() !== ""
    )
  );

  const [submitting, setSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.length > 500) {
      setErrorMessage(
        "Your wish cannot be more than 500 characters."
      );
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      // ==========================================
      // SAVE WISH TO DATABASE
      // ==========================================

      const {
        data,
        error,
      } = await supabase
        .from("gr_invitations")
        .update({
          wish_message: trimmedMessage,
          wish_created_at:
            new Date().toISOString(),
        })
        .eq(
          "gr_invitation_id",
          invitationId
        )
        .select(
          `
          gr_invitation_id,
          guest_name,
          wish_message,
          wish_created_at
          `
        )
        .single();

      if (error) {
        console.error(
          "Wish submission error:",
          error
        );

        setErrorMessage(
          "Something went wrong while saving your wish. Please try again."
        );

        return;
      }

      if (!data) {
        setErrorMessage(
          "Your wish could not be saved."
        );

        return;
      }

      // ==========================================
      // UPDATE LOCAL WISH LIST
      // ==========================================

      setWishes((prev) => {
        const existingIndex = prev.findIndex(
          (wish) =>
            wish.gr_invitation_id ===
            invitationId
        );

        if (existingIndex !== -1) {
          const updated = [...prev];

          updated[existingIndex] = {
            gr_invitation_id:
              data.gr_invitation_id,
            guest_name:
              data.guest_name,
            wish_message:
              data.wish_message,
            wish_created_at:
              data.wish_created_at,
          };

          return updated;
        }

        return [
          ...prev,
          {
            gr_invitation_id:
              data.gr_invitation_id,
            guest_name:
              data.guest_name,
            wish_message:
              data.wish_message,
            wish_created_at:
              data.wish_created_at,
          },
        ];
      });

      setMessage("");
      setSubmitted(true);

    } catch (error) {
      console.error(
        "Unexpected wish error:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#fffaf7] px-5 py-20 sm:px-8 md:px-12 lg:px-20">
      {/* Background Image */}
      <div className="absolute inset-0 md:left-[10%] md:right-[10%] w-full h-full md:w-auto">
        <img
          src="/images/genderreveal/hreobg.png"
          alt="Gender reveal invitation background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/* ==========================================
          BACKGROUND DECORATIONS
          ========================================== */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#bfe5f5] blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#f4c4d7] blur-3xl"
      />

      {/* Floating decorations */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute left-[5%] top-[15%] text-3xl opacity-60"
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute right-[6%] top-[20%] text-3xl opacity-60"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute bottom-[20%] left-[8%] text-2xl opacity-50"
      >
        ✨
      </motion.div>


      {/* ==========================================
          MAIN CONTENT
          ========================================== */}

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ========================================
            HEADING
            ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-12 text-center"
        >

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">
              💙
            </span>

            <Heart
              className="h-5 w-5 fill-[#e7aec4] text-[#d696b1]"
            />

            <span className="text-2xl">
              🎀
            </span>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a18b80]">
            A Little Love From You
          </p>

          <h2 className="font-serif text-4xl text-[#514238] sm:text-5xl">
            Leave a Wish 💌
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8c7b71] sm:text-base">
            Before the big reveal, leave a little
            message for the parents-to-be and
            their tiny little miracle.
          </p>

        </motion.div>


        {/* ========================================
            WISH FORM
            ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto max-w-2xl rounded-3xl border border-[#eaded7] bg-white/90 p-6 shadow-xl sm:p-8"
        >

          <div className="mb-5 text-center">

            <div className="mb-3 text-3xl">
              💌
            </div>

            <p className="font-serif text-xl text-[#514238]">
              Dear {guestName},
            </p>

            <p className="mt-2 text-sm text-[#8c7b71]">
              What would you like to say to
              the growing family?
            </p>

          </div>


          {!submitted ? (

            <form onSubmit={handleSubmit}>

              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrorMessage("");
                }}
                maxLength={500}
                rows={5}
                placeholder="Write your sweet wishes here..."
                className="w-full resize-none rounded-2xl border border-[#eaded7] bg-[#fffaf7] px-5 py-4 text-sm text-[#514238] outline-none transition placeholder:text-[#b5a69d] focus:border-[#d9a9bc] focus:ring-2 focus:ring-[#f3dce5]"
              />

              <div className="mt-2 flex justify-end text-xs text-[#a99a91]">
                {message.length}/500
              </div>


              {errorMessage && (
                <p className="mt-3 text-center text-sm text-red-500">
                  {errorMessage}
                </p>
              )}


              <button
                type="submit"
                disabled={
                  !message.trim() ||
                  submitting
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#514238] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#66544a] disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Send className="h-4 w-4" />

                {submitting
                  ? "Sending..."
                  : "Send My Wishes"}

              </button>

            </form>

          ) : (

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className="rounded-2xl bg-[#fff3f7] px-4 py-6 text-center text-sm text-[#a15f7b]"
            >

              <Heart className="mx-auto mb-2 h-5 w-5 fill-[#e4a9c0]" />

              <p className="font-medium">
                Your sweet wishes have been
                added. Thank you! 💕
              </p>

            </motion.div>

          )}

        </motion.div>


        {/* ========================================
            WISHES DISPLAY
            ======================================== */}

        {wishes.length > 0 && (

          <div className="mt-12">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="mb-8 text-center"
            >

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a18b80]">
                From Your Loved Ones
              </p>

              <h3 className="mt-2 font-serif text-3xl text-[#514238]">
                Wishes & Love
              </h3>

            </motion.div>


            <div className="grid gap-5 sm:grid-cols-2">

              {wishes.map(
                (wish, index) => (

                  <motion.div
                    key={
                      wish.gr_invitation_id
                    }
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.1,
                    }}
                    className="relative rounded-3xl border border-[#eee1da] bg-white/85 p-6 shadow-md"
                  >

                    {/* Corner icon */}
                    <div className="absolute right-5 top-5 text-lg">
                      {index % 2 === 0
                        ? "💙"
                        : "🎀"}
                    </div>


                    {/* Guest */}
                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3f7]">

                        <Heart
                          className="h-4 w-4 fill-[#e3a9bf] text-[#d696b1]"
                        />

                      </div>

                      <p className="font-semibold text-[#514238]">
                        {wish.guest_name}
                      </p>

                    </div>


                    {/* Message */}
                    <p className="text-sm leading-7 text-[#76665d]">
                      “{wish.wish_message}”
                    </p>

                  </motion.div>

                )
              )}

            </div>

          </div>

        )}


        {/* ========================================
            BOTTOM DECORATION
            ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mt-12 flex justify-center gap-4 text-xl"
        >

          <span>💙</span>
          <span>🌸</span>
          <span>🎀</span>

          <Sparkles className="h-5 w-5 text-[#d9a3b8]" />

          <span>🎀</span>
          <span>🌸</span>
          <span>💗</span>

        </motion.div>

      </div>

    </section>
  );
}