
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  CheckCircle2,
  XCircle,
  Users,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface WeddingInvitationRecord {
  wedding_invitation_id: number;
  event_id: number;
  guest_token?: string | null;
  guest_name?: string | null;
  number_of_guests?: number | null;
  rsvp_status?: string | null;
  attending_count?: number | null;
  responded_at?: string | null;
}

interface GuestWish {
  wish_id?: number;
  event_id: number;
  guest_name: string;
  message: string;
  created_at?: string;
}

interface GuestMessagesProps {
  guestName: string;
  invitationId: string | number;
  guestCount: number;
  invitation?: WeddingInvitationRecord | null;
}

type RSVPStatus = "accepted" | "declined" | null;

export default function GuestMessages({
  guestName,
  invitationId,
  guestCount,
  invitation,
}: GuestMessagesProps) {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [message, setMessage] = useState("");

  const [response, setResponse] = useState<RSVPStatus>(
    invitation?.rsvp_status === "accepted" ||
      invitation?.rsvp_status === "declined"
      ? invitation.rsvp_status
      : null
  );

  const [attendingCount, setAttendingCount] = useState<number>(
    Number(invitation?.attending_count ?? guestCount ?? 1)
  );

  const [loadingWishes, setLoadingWishes] = useState(true);
  const [savingRSVP, setSavingRSVP] = useState(false);
  const [savingMessage, setSavingMessage] = useState(false);
  const [updatingCount, setUpdatingCount] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * Resolve the invitation's primary key.
   */
  const resolveInvitationId = useCallback(async (): Promise<number> => {
    if (invitation?.wedding_invitation_id) {
      return Number(invitation.wedding_invitation_id);
    }

    const suppliedId = String(invitationId ?? "").trim();

    if (!suppliedId) {
      throw new Error("The invitation reference is missing.");
    }

    const { data: tokenData, error: tokenError } = await supabase
      .from("wedding_invitations")
      .select("wedding_invitation_id")
      .eq("guest_token", suppliedId)
      .maybeSingle();

    if (tokenError) {
      console.error("Invitation token lookup failed:", tokenError);
      throw new Error(tokenError.message);
    }

    if (tokenData?.wedding_invitation_id) {
      return Number(tokenData.wedding_invitation_id);
    }

    const numericId = Number(suppliedId);

    if (Number.isInteger(numericId) && numericId > 0) {
      const { data: idData, error: idError } = await supabase
        .from("wedding_invitations")
        .select("wedding_invitation_id")
        .eq("wedding_invitation_id", numericId)
        .maybeSingle();

      if (idError) {
        console.error("Invitation ID lookup failed:", idError);
        throw new Error(idError.message);
      }

      if (idData?.wedding_invitation_id) {
        return Number(idData.wedding_invitation_id);
      }
    }

    throw new Error("Could not find the invitation in Supabase.");
  }, [invitation, invitationId]);

  /*
   * Load wishes belonging to this event.
   */
  const loadWishes = useCallback(async () => {
    setLoadingWishes(true);

    try {
      const eventId = Number(invitation?.event_id);

      if (!Number.isInteger(eventId) || eventId <= 0) {
        throw new Error("The invitation does not contain a valid event ID.");
      }

      const { data, error } = await supabase
        .from("wishes")
        .select("wish_id, event_id, guest_name, message, created_at")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Loading wishes failed:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        throw new Error(error.message);
      }

      setWishes((data ?? []) as GuestWish[]);
    } catch (error) {
      console.error("Could not load wishes:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load guest messages."
      );
    } finally {
      setLoadingWishes(false);
    }
  }, [invitation?.event_id]);

  useEffect(() => {
    void loadWishes();
  }, [loadWishes]);

  /*
   * Save RSVP.
   */
  const handleRSVP = async (status: Exclude<RSVPStatus, null>) => {
    if (savingRSVP) return;

    setSavingRSVP(true);
    setFeedback("");
    setErrorMessage("");

    try {
      const activeInvitationId = await resolveInvitationId();

      const newCount =
        status === "accepted"
          ? Math.max(1, Number(attendingCount) || Number(guestCount) || 1)
          : 0;

      const { data, error } = await supabase
        .from("wedding_invitations")
        .update({
          rsvp_status: status,
          attending_count: newCount,
          responded_at: new Date().toISOString(),
        })
        .eq("wedding_invitation_id", activeInvitationId)
        .select("wedding_invitation_id, rsvp_status, attending_count")
        .maybeSingle();

      if (error) {
        console.error("Saving RSVP failed:", error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error(
          "No invitation was updated. Check the Supabase UPDATE policy."
        );
      }

      setResponse(data.rsvp_status as RSVPStatus);
      setAttendingCount(Number(data.attending_count ?? 0));

      setFeedback(
        status === "accepted"
          ? "Thank you! Your attendance has been confirmed."
          : "Your response has been recorded. Thank you."
      );
    } catch (error) {
      console.error("RSVP save failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your RSVP."
      );
    } finally {
      setSavingRSVP(false);
    }
  };

  /*
   * Update attendee count.
   */
  const updateCountInSupabase = async (newCount: number) => {
    if (updatingCount || response !== "accepted") return;

    const maximum = Math.max(1, Number(guestCount) || 1);
    const safeCount = Math.max(1, Math.min(maximum, Math.floor(newCount)));

    setUpdatingCount(true);
    setFeedback("");
    setErrorMessage("");

    try {
      const activeInvitationId = await resolveInvitationId();

      const { data, error } = await supabase
        .from("wedding_invitations")
        .update({
          attending_count: safeCount,
          responded_at: new Date().toISOString(),
        })
        .eq("wedding_invitation_id", activeInvitationId)
        .eq("rsvp_status", "accepted")
        .select("wedding_invitation_id, attending_count")
        .maybeSingle();

      if (error) {
        console.error("Updating guest count failed:", error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("The attendee count was not updated.");
      }

      setAttendingCount(Number(data.attending_count));
      setFeedback("Your guest count has been updated.");
    } catch (error) {
      console.error("Guest count update failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not update the guest count."
      );
    } finally {
      setUpdatingCount(false);
    }
  };

  /*
   * Save a guest wish to Supabase.
   */
  const handleMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setErrorMessage("Please enter a message before submitting.");
      return;
    }

    if (savingMessage) return;

    setSavingMessage(true);
    setFeedback("");
    setErrorMessage("");

    try {
      const eventId = Number(invitation?.event_id);

      if (!Number.isInteger(eventId) || eventId <= 0) {
        throw new Error(
          "Invalid event ID. Check the invitation record passed to GuestMessages."
        );
      }

      const wishToSave = {
        event_id: eventId,
        guest_name: guestName.trim() || "Guest",
        message: trimmedMessage,
      };

      console.log("Saving wish to Supabase:", {
        event_id: wishToSave.event_id,
        guest_name: wishToSave.guest_name,
      });

      const { data, error } = await supabase
        .from("wishes")
        .insert(wishToSave)
        .select("wish_id, event_id, guest_name, message, created_at")
        .single();

      if (error) {
        console.error("Supabase wish insert failed:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        throw new Error(
          `Could not save your wish: ${error.message}${
            error.details ? ` — ${error.details}` : ""
          }`
        );
      }

      if (!data) {
        throw new Error("Supabase did not return the saved wish.");
      }

      // Display the row returned by Supabase, not an unsaved local object.
      setWishes((current) => [
        data as GuestWish,
        ...current.filter((wish) => wish.wish_id !== data.wish_id),
      ]);

      setMessage("");
      setFeedback("Your message has been saved. Thank you!");

      // Re-fetch from the database to confirm the saved list.
      await loadWishes();
    } catch (error) {
      console.error("Guest wish save failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your message. Please try again."
      );
    } finally {
      setSavingMessage(false);
    }
  };

  return (
    <section
      id="guest-messages"
      className="relative overflow-hidden bg-[#fbf7f1] px-5 py-20 text-[#49382d] md:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Heart
            className="mx-auto mb-4 text-[#b99572]"
            size={30}
            strokeWidth={1.3}
          />

          <p className="text-xs uppercase tracking-[0.35em] text-[#92795c]">
            A little note from you
          </p>

          <h2 className="mt-3 font-serif text-3xl md:text-5xl">
            RSVP &amp; Guest Wishes
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#92795c]">
            Your presence means so much to us. Please let us know if you can
            join us, and leave a message for our special day.
          </p>
        </div>

        {/* RSVP */}
        <div className="mb-8 rounded-3xl border border-[#ddc9b1] bg-white/70 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Users className="text-[#b99572]" size={24} />

            <div>
              <h3 className="font-serif text-2xl">Will you join us?</h3>
              <p className="mt-1 text-sm text-[#92795c]">
                Kindly share your response.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              disabled={savingRSVP}
              onClick={() => void handleRSVP("accepted")}
              className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                response === "accepted"
                  ? "border-[#8b9b76] bg-[#e8eddf] text-[#425238]"
                  : "border-[#ddc9b1] bg-white hover:bg-[#f5efe6]"
              }`}
            >
              {savingRSVP ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              Yes, I&apos;ll be there
            </button>

            <button
              type="button"
              disabled={savingRSVP}
              onClick={() => void handleRSVP("declined")}
              className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                response === "declined"
                  ? "border-[#c89da5] bg-[#f7e9eb] text-[#784d56]"
                  : "border-[#ddc9b1] bg-white hover:bg-[#f5efe6]"
              }`}
            >
              {savingRSVP ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <XCircle size={18} />
              )}
              Sorry, can&apos;t make it
            </button>
          </div>

          {response === "accepted" && (
            <div className="mt-6 rounded-2xl bg-[#f5efe6] p-5">
              <label
                htmlFor="attendingCount"
                className="mb-3 block text-sm text-[#6e5947]"
              >
                Number of guests attending
              </label>

              <div className="flex items-center gap-4">
                <select
                  id="attendingCount"
                  value={attendingCount}
                  disabled={updatingCount || savingRSVP}
                  onChange={(event) =>
                    void updateCountInSupabase(Number(event.target.value))
                  }
                  className="w-full rounded-xl border border-[#ddc9b1] bg-white px-4 py-3 outline-none focus:border-[#b99572] disabled:opacity-60"
                >
                  {Array.from(
                    { length: Math.max(1, Number(guestCount) || 1) },
                    (_, index) => index + 1
                  ).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>

                {updatingCount && (
                  <Loader2
                    size={20}
                    className="shrink-0 animate-spin text-[#92795c]"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Leave a wish */}
        <div className="mb-10 rounded-3xl border border-[#ddc9b1] bg-white/70 p-6 shadow-sm md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <MessageCircle className="text-[#b99572]" size={24} />

            <div>
              <h3 className="font-serif text-2xl">Leave a wish</h3>
              <p className="mt-1 text-sm text-[#92795c]">
                Send the couple a lovely message.
              </p>
            </div>
          </div>

          <form onSubmit={handleMessageSubmit} className="space-y-4">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your wishes for the couple..."
              rows={4}
              maxLength={1000}
              required
              disabled={savingMessage}
              className="w-full resize-y rounded-2xl border border-[#ddc9b1] bg-white px-5 py-4 text-sm leading-7 outline-none transition placeholder:text-[#b4a18e] focus:border-[#b99572] disabled:opacity-60"
            />

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-[#92795c]">
                {message.length}/1000
              </span>

              <button
                type="submit"
                disabled={savingMessage || !message.trim()}
                className="flex items-center justify-center gap-2 rounded-full bg-[#49382d] px-6 py-3 text-sm text-white transition hover:bg-[#6a5140] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingMessage ? (
                  <Loader2 className="animate-spin" size={17} />
                ) : (
                  <Send size={16} />
                )}
                {savingMessage ? "Sending..." : "Send wish"}
              </button>
            </div>
          </form>
        </div>

        {/* Feedback and errors */}
        {feedback && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-[#c8d6bd] bg-[#edf3e8] px-5 py-4 text-sm text-[#425238]"
          >
            {feedback}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-[#e2bfc4] bg-[#f9ebed] px-5 py-4 text-sm leading-6 text-[#784d56]"
          >
            {errorMessage}
          </div>
        )}

        {/* Messages from loved ones */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl">
              Messages from loved ones
            </h3>

            <span className="rounded-full border border-[#ddc9b1] px-3 py-1 text-xs text-[#92795c]">
              {wishes.length}{" "}
              {wishes.length === 1 ? "message" : "messages"}
            </span>
          </div>

          {loadingWishes ? (
            <div className="flex items-center justify-center gap-3 py-10 text-sm text-[#92795c]">
              <Loader2 className="animate-spin" size={20} />
              Loading messages...
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#ddc9b1] px-6 py-10 text-center">
              <MessageCircle
                className="mx-auto mb-3 text-[#b99572]"
                size={28}
                strokeWidth={1.3}
              />

              <p className="font-serif text-xl">
                Be the first to leave a wish
              </p>

              <p className="mt-2 text-sm text-[#92795c]">
                Your kind words will make the day even more special.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <article
                  key={wish.wish_id ?? `${wish.created_at}-${index}`}
                  className="rounded-2xl border border-[#ddc9b1] bg-white/70 p-5 md:p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1e5d8]">
                      <Heart
                        size={17}
                        className="text-[#b99572]"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {wish.guest_name || "Guest"}
                      </p>

                      {wish.created_at && (
                        <p className="mt-1 text-xs text-[#92795c]">
                          {new Date(wish.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#6e5947]">
                    {wish.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}