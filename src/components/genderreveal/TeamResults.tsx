"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface Invitation {
  gr_invitation_id: number;
  guest_name: string;
  vote: "boy" | "girl" | null;
  wish_message: string | null;
  wish_created_at: string | null;
}

interface TeamResultsProps {
  invitations?: Invitation[];
}

export default function TeamResults({
  invitations = [],
}: TeamResultsProps) {
  const boyTeam = invitations.filter(
    (guest) => guest.vote === "boy"
  );

  const girlTeam = invitations.filter(
    (guest) => guest.vote === "girl"
  );
  const totalVotes = boyTeam.length + girlTeam.length;

  const boyPercentage =
    totalVotes > 0
      ? Math.round((boyTeam.length / totalVotes) * 100)
      : 0;

  const girlPercentage =
    totalVotes > 0
      ? Math.round((girlTeam.length / totalVotes) * 100)
      : 0;

  return (
    <section className="relative overflow-hidden bg-[#fffaf7] px-5 py-20 sm:px-8 md:px-12 lg:px-20">
      {/* Background decorations */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#dff3fc] opacity-60 blur-3xl" />

      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#fde3ed] opacity-60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-2xl">💙</span>

            <Sparkles className="h-5 w-5 text-[#d39bb2]" />

            <span className="text-2xl">🎀</span>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a18b80]">
            The Guessing Game
          </p>

          <h2 className="font-serif text-4xl text-[#514238] sm:text-5xl">
            Who's On Which Team?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8c7b71] sm:text-base">
            See who has joined Team Boy and Team Girl before the
            big reveal!
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* BOY TEAM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border-2 border-[#d7edf6] bg-white/90 shadow-xl"
          >
            <div className="bg-[#eaf7fd] px-6 py-8 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  src="/images/genderreveal/boyimage1.jpg"
                  alt="Team Boy"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#77a7bf]">
                Team
              </p>

              <h3 className="mt-1 font-serif text-3xl text-[#568daf]">
                Boy 💙
              </h3>

              <p className="mt-2 text-4xl font-bold text-[#568daf]">
                {boyTeam.length}
              </p>

              <p className="text-xs text-[#7e9baa]">
                {boyPercentage}% of votes
              </p>
            </div>

            <div className="p-6">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#9a8b84]">
                Team Members
              </p>

              {boyTeam.length === 0 ? (
                <p className="py-4 text-center text-sm text-[#a18b80]">
                  No one has joined Team Boy yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {boyTeam.map((guest) => (
                    <motion.div
                      key={guest.gr_invitation_id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 rounded-2xl bg-[#f3faff] px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dff3fc]">
                        💙
                      </div>

                      <span className="text-sm font-medium text-[#5d7480]">
                        {guest.guest_name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* GIRL TEAM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border-2 border-[#f2d5df] bg-white/90 shadow-xl"
          >
            <div className="bg-[#fff0f5] px-6 py-8 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  src="/images/genderreveal/girlimage1.jpg"
                  alt="Team Girl"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b98298]">
                Team
              </p>

              <h3 className="mt-1 font-serif text-3xl text-[#b56f8c]">
                Girl 🎀
              </h3>

              <p className="mt-2 text-4xl font-bold text-[#b56f8c]">
                {girlTeam.length}
              </p>

              <p className="text-xs text-[#a47d8c]">
                {girlPercentage}% of votes
              </p>
            </div>

            <div className="p-6">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#9a8b84]">
                Team Members
              </p>

              {girlTeam.length === 0 ? (
                <p className="py-4 text-center text-sm text-[#a18b80]">
                  No one has joined Team Girl yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {girlTeam.map((guest) => (
                    <motion.div
                      key={guest.gr_invitation_id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 rounded-2xl bg-[#fff7fa] px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fde3ed]">
                        🎀
                      </div>

                      <span className="text-sm font-medium text-[#806572]">
                        {guest.guest_name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-[2rem] border border-[#eaded7] bg-white/80 p-7 text-center shadow-lg"
        >
          <div className="mb-3 text-3xl">
            👗💙🎀
          </div>

          <h3 className="font-serif text-2xl text-[#514238]">
            Dress Code
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#806f66]">
            All guests, please wear your team color according
            to your guess!
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="rounded-full bg-[#dff3fc] px-6 py-3 text-sm font-semibold text-[#568daf]">
              Team Boy → Light Blue 💙
            </div>

            <div className="rounded-full bg-[#fde3ed] px-6 py-3 text-sm font-semibold text-[#b56f8c]">
              Team Girl → Light Pink 🎀
            </div>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center justify-center gap-3 text-xl">
          <span>💙</span>
          <span>🌸</span>
          <Heart className="h-5 w-5 fill-[#e3aec2] text-[#d79ab3]" />
          <span>🎀</span>
          <span>🌸</span>
          <span>💗</span>
        </div>
      </div>
    </section>
  );
}