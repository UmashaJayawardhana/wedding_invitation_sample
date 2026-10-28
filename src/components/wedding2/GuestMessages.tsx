
"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Send,
  CheckCircle2,
  XCircle,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";

interface WeddingInvitationRecord {
  wedding_invitation_id: number;
  event_id: number;
  guest_name: string;
  guest_token?: string;
  invitation_type: string;
  number_of_guests: number;
  rsvp_status: string;
  attending_count: number | null;
  responded_at: string | null;
  wish_message: string | null;
  wish_created_at: string | null;
}

interface GuestMessage {
  id: number;
  guestName: string;
  message: string;
  createdAt: string;
}

interface GuestMessagesProps {
  guestName: string;
  invitationId: string | number;
  guestCount: number;
  invitation: WeddingInvitationRecord;
}

export default function GuestMessages({
  guestName,
  invitationId,
  guestCount,
  invitation,
}: GuestMessagesProps) {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [message, setMessage] = useState("");
 const [rsvpStatus, setRsvpStatus] = useState<
  "pending" | "accepted" | "declined"
>(
  invitation.rsvp_status === "accepted" ||
    invitation.rsvp_status === "declined"
    ? invitation.rsvp_status
    : "pending"
);
  const [attendingCount, setAttendingCount] = useState<number>(
    invitation.attending_count ?? guestCount
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const maxGuests = Math.max(1, guestCount);

  // Load wishes from wedding_invitations for this event.
  const loadMessages = useCallback(async () => {
    if (!invitation?.event_id) {
      setIsLoadingMessages(false);
      return;
    }

    setIsLoadingMessages(true);

    try {
      const { data, error: fetchError } = await supabase
        .from("wedding_invitations")
        .select(
          "wedding_invitation_id, guest_name, wish_message, wish_created_at"
        )
        .eq("event_id", invitation.event_id)
        .not("wish_message", "is", null)
        .order("wish_created_at", { ascending: false });

      if (fetchError) {
        console.error("Error loading wishes:", fetchError);
        setError("Unable to load messages at the moment.");
        return;
      }

      const formattedMessages: GuestMessage[] = (data ?? [])
        .filter(
          (item) =>
            typeof item.wish_message === "string" &&
            item.wish_message.trim().length > 0
        )
        .map((item) => ({
          id: item.wedding_invitation_id,
          guestName: item.guest_name,
          message: item.wish_message ?? "",
          createdAt: item.wish_created_at ?? "",
        }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error("Unexpected error loading wishes:", err);
      setError("Unable to load messages at the moment.");
    } finally {
      setIsLoadingMessages(false);
    }
  }, [invitation?.event_id]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  // Submit or update the current guest's wish.
  const handleMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    setError("");
    setSuccess("");

    if (!trimmedMessage) {
      setError("Please enter a message before submitting.");
      return;
    }

    if (trimmedMessage.length > 500) {
      setError("Your message cannot exceed 500 characters.");
      return;
    }

    if (!invitation?.wedding_invitation_id) {
      setError("Invitation not found. Please reopen your invitation.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: saveError } = await supabase
        .from("wedding_invitations")
        .update({
          wish_message: trimmedMessage,
          wish_created_at: new Date().toISOString(),
        })
        .eq(
          "wedding_invitation_id",
          invitation.wedding_invitation_id
        )
        .select(
          "wedding_invitation_id, guest_name, wish_message, wish_created_at"
        )
        .single();

      if (saveError) {
        console.error("Supabase wish save error:", saveError);
        throw new Error(saveError.message);
      }

      if (!data) {
        throw new Error(
          "No invitation was updated. Check your invitation ID and database permissions."
        );
      }

      const savedMessage: GuestMessage = {
        id: data.wedding_invitation_id,
        guestName: data.guest_name,
        message: data.wish_message ?? "",
        createdAt: data.wish_created_at ?? "",
      };

      // Update the UI using the actual row returned by Supabase.
      setMessages((previous) => [
        savedMessage,
        ...previous.filter((item) => item.id !== savedMessage.id),
      ]);

      setMessage("");
      setSuccess("Your message has been saved. Thank you!");
    } catch (err) {
      console.error("Failed to save wish:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save RSVP status and attending count together in the invitation row.
  const handleRSVP = async (
    status: "accepted" | "declined"
  ) => {
    setError("");
    setSuccess("");

    if (!invitation?.wedding_invitation_id) {
      setError("Invitation not found.");
      return;
    }

    setIsRsvpLoading(true);

    const newAttendingCount =
      status === "accepted" ? maxGuests : 0;

    try {
      const { data, error: updateError } = await supabase
        .from("wedding_invitations")
        .update({
          rsvp_status: status,
          attending_count: newAttendingCount,
          responded_at: new Date().toISOString(),
        })
        .eq(
          "wedding_invitation_id",
          invitation.wedding_invitation_id
        )
        .select(
          "wedding_invitation_id, rsvp_status, attending_count"
        )
        .single();

      if (updateError) {
        console.error("RSVP update error:", updateError);
        throw new Error(updateError.message);
      }

      if (!data) {
        throw new Error("No invitation was updated.");
      }

      setRsvpStatus(data.rsvp_status);
      setAttendingCount(data.attending_count ?? 0);
      setSuccess(
        status === "accepted"
          ? "Thank you! Your attendance has been confirmed."
          : "Your response has been recorded."
      );
    } catch (err) {
      console.error("Failed to update RSVP:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your RSVP. Please try again."
      );
    } finally {
      setIsRsvpLoading(false);
    }
  };

  const formattedDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      id="guest-messages"
      className="relative overflow-hidden bg-[#fbf7f1] px-5 py-20 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex justify-center">
            <Heart
              size={34}
              strokeWidth={1.2}
              className="text-[#b78b8b]"
            />
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-[#92795c]">
            With love
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#49382d] md:text-5xl">
            Messages from Loved Ones
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#b89b72]" />

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#92795c]">
            Share your wishes and be part of our beautiful memories.
          </p>
        </motion.div>

        {/* RSVP card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl rounded-3xl border border-[#e5d7c5] bg-white/70 p-6 shadow-sm md:p-8"
        >
          <div className="mb-6 text-center">
            <h3 className="font-serif text-2xl text-[#49382d]">
              Will You Join Us?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#92795c]">
              We would love to celebrate this special day with you.
            </p>
          </div>

          {rsvpStatus !== "pending" && (
            <div className="mb-5 flex items-center justify-center gap-2 text-sm text-[#92795c]">
              {rsvpStatus === "accepted" ? (
                <CheckCircle2
                  size={18}
                  className="text-green-700"
                />
              ) : (
                <XCircle size={18} className="text-red-700" />
              )}

              <span>
                {rsvpStatus === "accepted"
                  ? `Attendance confirmed (${attendingCount} ${
                      attendingCount === 1 ? "guest" : "guests"
                    })`
                  : "You have declined the invitation."}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleRSVP("accepted")}
              disabled={isRsvpLoading}
              className="flex items-center justify-center gap-2 rounded-full bg-[#8a9b78] px-7 py-3 text-sm text-white transition hover:bg-[#718461] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRsvpLoading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <CheckCircle2 size={17} />
              )}
              Accept with pleasure
            </button>

            <button
              type="button"
              onClick={() => handleRSVP("declined")}
              disabled={isRsvpLoading}
              className="flex items-center justify-center gap-2 rounded-full border border-[#d8c6b3] px-7 py-3 text-sm text-[#806c5c] transition hover:bg-[#f5eee6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <XCircle size={17} />
              Regretfully decline
            </button>
          </div>
        </motion.div>

        {/* Wish form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-14 max-w-2xl rounded-3xl border border-[#e5d7c5] bg-white/70 p-6 shadow-sm md:p-8"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <MessageCircle
              size={22}
              strokeWidth={1.3}
              className="text-[#b78b8b]"
            />
            <h3 className="font-serif text-2xl text-[#49382d]">
              Leave a Wish
            </h3>
          </div>

          <form onSubmit={handleMessageSubmit}>
            <label
              htmlFor="guest-wish"
              className="mb-2 block text-sm text-[#806c5c]"
            >
              Your message
            </label>

            <textarea
              id="guest-wish"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={`Write your wishes for the couple${
                guestName ? `, ${guestName}` : ""
              }...`}
              rows={5}
              maxLength={500}
              required
              className="w-full resize-y rounded-2xl border border-[#e5d7c5] bg-[#fffdf9] p-4 text-sm leading-7 text-[#49382d] outline-none transition placeholder:text-[#b3a394] focus:border-[#b89b72] focus:ring-2 focus:ring-[#b89b72]/20"
            />

            <div className="mt-2 flex justify-end text-xs text-[#92795c]">
              {message.length}/500
            </div>

            {error && (
              <p
                role="alert"
                className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#49382d] px-6 py-3.5 text-sm text-white transition hover:bg-[#604a3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving your wish...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Your Wish
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Messages from all guests */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="font-serif text-2xl text-[#49382d] md:text-3xl">
              Words from the Heart
            </h3>

            <p className="mt-3 text-sm text-[#92795c]">
              Beautiful wishes shared by our loved ones.
            </p>
          </div>

          {isLoadingMessages ? (
            <div className="flex justify-center py-12">
              <LoaderCircle
                size={28}
                className="animate-spin text-[#b89b72]"
              />
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d8c6b3] px-6 py-12 text-center">
              <Heart
                size={28}
                strokeWidth={1.2}
                className="mx-auto mb-4 text-[#c8a4a4]"
              />

              <p className="font-serif text-xl text-[#49382d]">
                Be the first to share a wish
              </p>

              <p className="mt-2 text-sm text-[#92795c]">
                Your kind words will make this day even more special.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <AnimatePresence initial={false}>
                {messages.map((item) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl border border-[#e5d7c5] bg-white/70 p-6 shadow-sm"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1e5df]">
                        <Heart
                          size={17}
                          strokeWidth={1.3}
                          className="text-[#b78b8b]"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate font-medium text-[#49382d]">
                          {item.guestName}
                        </h4>

                        {item.createdAt && (
                          <p className="mt-1 text-xs text-[#a18c78]">
                            {formattedDate(item.createdAt)}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#806c5c]">
                      {item.message}
                    </p>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}