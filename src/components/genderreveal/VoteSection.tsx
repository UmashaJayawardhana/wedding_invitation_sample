"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Sparkles, Vote } from "lucide-react";
import { supabase } from "@/lib/supabase";

type VoteChoice = "boy" | "girl";

interface VoteSectionProps {
  guestName?: string;
  invitationId: number;
  currentVote?: VoteChoice | null;
  onVoteUpdated?: (
    invitationId: number,
    vote: VoteChoice
  ) => void;
}

export default function VoteSection({
  guestName = "Guest",
  invitationId,
  currentVote = null,
  onVoteUpdated,
}: VoteSectionProps) {
  const [selectedVote, setSelectedVote] =
    useState<VoteChoice | null>(currentVote);

  const [submitted, setSubmitted] = useState<boolean>(
    currentVote !== null
  );

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelect = (vote: VoteChoice) => {
    if (submitted || submitting) {
      return;
    }

    setSelectedVote(vote);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedVote) {
      setErrorMessage(
        "Please choose Team Boy or Team Girl."
      );
      return;
    }

    if (!invitationId) {
      setErrorMessage(
        "Invitation could not be identified."
      );
      return;
    }

    if (submitted) {
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase
        .from("gr_invitations")
        .update({
          vote: selectedVote,
          voted_at: new Date().toISOString(),
        })
        .eq("gr_invitation_id", invitationId)
        .is("vote", null)
        .select("gr_invitation_id, vote")
        .maybeSingle();

      if (error) {
        console.error(
          "Vote submission error:",
          error
        );

        setErrorMessage(
          "Something went wrong while saving your guess. Please try again."
        );

        return;
      }

      if (!data) {
        setSubmitted(true);

        setErrorMessage(
          "A vote has already been submitted for this invitation."
        );

        return;
      }

      const savedVote = data.vote as VoteChoice;

      setSelectedVote(savedVote);
      setSubmitted(true);

      onVoteUpdated?.(
        data.gr_invitation_id,
        savedVote
      );
    } catch (error) {
      console.error(
        "Unexpected vote error:",
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
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#b9e4f7] blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#f3c4d7] blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-[18%] text-3xl opacity-60"
      >
        💙
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[5%] top-[20%] text-3xl opacity-60"
      >
        🎀
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl">

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
            <span className="text-2xl">💙</span>

            <Sparkles className="h-5 w-5 text-[#d39bb2]" />

            <span className="text-2xl">🎀</span>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a18b80]">
            Make Your Guess
          </p>

          <h2 className="font-serif text-4xl text-[#514238] sm:text-5xl">
            Boy or Girl?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8c7b71] sm:text-base">
            Dear {guestName}, which team are you joining?
            Choose your guess before the big reveal!
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">

          <motion.button
            type="button"
            whileHover={!submitted ? { y: -6 } : {}}
            whileTap={!submitted ? { scale: 0.98 } : {}}
            onClick={() => handleSelect("boy")}
            disabled={submitted || submitting}
            className={`relative overflow-hidden rounded-[2rem] border-2 p-6 text-left transition-all duration-300 sm:p-8 ${selectedVote === "boy"
                ? "border-[#79bddd] bg-[#eaf7fd] shadow-xl shadow-[#acd9ed]/40"
                : "border-[#d6ebf4] bg-white/90 hover:border-[#9fd1e7] hover:shadow-lg"
              } ${submitted && selectedVote !== "boy"
                ? "cursor-not-allowed opacity-45"
                : ""
              }`}
          >
            {selectedVote === "boy" && (
              <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#6eb5d9] text-white">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div className="flex flex-col items-center text-center">

              <div
                className={`mb-5 h-36 w-36 overflow-hidden rounded-full border-4 bg-white shadow-lg sm:h-44 sm:w-44 ${selectedVote === "boy"
                    ? "border-[#8fcbe6]"
                    : "border-[#d7edf6]"
                  }`}
              >
                <img
                  src="/images/genderreveal/boyimage1.jpg"
                  alt="Baby boy"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#77a7bf]">
                Team
              </p>

              <h3 className="mt-1 font-serif text-3xl text-[#568daf]">
                Boy 💙
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#7e9baa]">
                I'm guessing it's a little prince!
              </p>

              <div
                className={`mt-6 rounded-full px-6 py-2 text-xs font-semibold transition ${selectedVote === "boy"
                    ? "bg-[#75b9db] text-white"
                    : "bg-[#e9f6fc] text-[#568daf]"
                  }`}
              >
                {selectedVote === "boy"
                  ? "YOUR CHOICE 💙"
                  : "CHOOSE TEAM BOY"}
              </div>

            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={!submitted ? { y: -6 } : {}}
            whileTap={!submitted ? { scale: 0.98 } : {}}
            onClick={() => handleSelect("girl")}
            disabled={submitted || submitting}
            className={`relative overflow-hidden rounded-[2rem] border-2 p-6 text-left transition-all duration-300 sm:p-8 ${selectedVote === "girl"
                ? "border-[#e1a4bd] bg-[#fff0f5] shadow-xl shadow-[#efbfd1]/40"
                : "border-[#f2d5df] bg-white/90 hover:border-[#e7b4c8] hover:shadow-lg"
              } ${submitted && selectedVote !== "girl"
                ? "cursor-not-allowed opacity-45"
                : ""
              }`}
          >
            {selectedVote === "girl" && (
              <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#d99ab5] text-white">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div className="flex flex-col items-center text-center">

              <div
                className={`mb-5 h-36 w-36 overflow-hidden rounded-full border-4 bg-white shadow-lg sm:h-44 sm:w-44 ${selectedVote === "girl"
                    ? "border-[#e5a8bf]"
                    : "border-[#f4dce5]"
                  }`}
              >
                <img
                  src="/images/genderreveal/girlimage1.jpg"
                  alt="Baby girl"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b98298]">
                Team
              </p>

              <h3 className="mt-1 font-serif text-3xl text-[#b56f8c]">
                Girl 🎀
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#a47d8c]">
                I'm guessing it's a little princess!
              </p>

              <div
                className={`mt-6 rounded-full px-6 py-2 text-xs font-semibold transition ${selectedVote === "girl"
                    ? "bg-[#d99ab5] text-white"
                    : "bg-[#fff0f5] text-[#b56f8c]"
                  }`}
              >
                {selectedVote === "girl"
                  ? "YOUR CHOICE 🎀"
                  : "CHOOSE TEAM GIRL"}
              </div>

            </div>
          </motion.button>

        </div>

        <div className="mt-10 text-center">

          {!submitted && (
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedVote || submitting}
              whileHover={
                selectedVote && !submitting
                  ? { scale: 1.03 }
                  : {}
              }
              whileTap={
                selectedVote && !submitting
                  ? { scale: 0.98 }
                  : {}
              }
              className="mx-auto flex items-center justify-center gap-3 rounded-full bg-[#514238] px-8 py-4 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Vote className="h-5 w-5" />

              {submitting
                ? "Saving Your Guess..."
                : "Submit My Guess"}
            </motion.button>
          )}

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                className="mx-auto mt-5 max-w-md rounded-2xl bg-[#fff0f2] px-5 py-4 text-sm text-[#a45d70]"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                className="mx-auto mt-8 max-w-xl rounded-3xl border border-[#eaded7] bg-white/90 px-6 py-8 shadow-xl"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="mb-4 text-4xl"
                >
                  {selectedVote === "boy"
                    ? "💙"
                    : "🎀"}
                </motion.div>

                <h3 className="font-serif text-3xl text-[#514238]">
                  Your Guess Is In! 🎉
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#806f66]">
                  You're officially on{" "}
                  <strong>
                    {selectedVote === "boy"
                      ? "Team Boy 💙"
                      : "Team Girl 🎀"}
                  </strong>
                  !
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#a18b80]">
                  <Heart className="h-4 w-4 fill-[#e3aec2] text-[#d79ab3]" />

                  <span>
                    Your vote has been saved.
                  </span>

                  <Heart className="h-4 w-4 fill-[#e3aec2] text-[#d79ab3]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-14 flex items-center justify-center gap-3 text-xl sm:gap-5 sm:text-2xl"
        >
          <span>💙</span>
          <span>🌸</span>
          <span>🎀</span>

          <Sparkles className="h-5 w-5 text-[#d5a1b6]" />

          <span>🎀</span>
          <span>🌸</span>
          <span>💗</span>
        </motion.div>

      </div>
    </section>
  );
}