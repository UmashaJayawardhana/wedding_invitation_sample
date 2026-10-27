
"use client";

import { useState, type FormEvent } from "react";
import {
  Heart,
  CheckCircle2,
  XCircle,
  Send,
} from "lucide-react";

interface GuestMessage {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestMessagesProps {
  guestName: string;
  invitationId: string;
  guestCount: number;
}

export default function GuestMessages({
  guestName,
  invitationId,
  guestCount,
}: GuestMessagesProps) {
  // Ensure the invited guest count is at least 1.
  const maxGuests = Math.max(
    1,
    Number.isFinite(guestCount) ? Math.floor(guestCount) : 1
  );

  const [name, setName] = useState(guestName || "");
  const [message, setMessage] = useState("");

  const [response, setResponse] = useState<
    "accepted" | "declined" | null
  >(null);

  const [attendingCount, setAttendingCount] = useState(maxGuests);

  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleRSVP(choice: "accepted" | "declined") {
    setResponse(choice);
  }

  function decreaseGuestCount() {
    setAttendingCount((count) => Math.max(1, count - 1));
  }

  function increaseGuestCount() {
    setAttendingCount((count) =>
      Math.min(maxGuests, count + 1)
    );
  }

  function handleMessageSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim() || !message.trim()) return;

    const newMessage: GuestMessage = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    setMessages((previous) => [newMessage, ...previous]);
    setMessage("");
    setSubmitted(true);
  }

  return (
    <section
      id="wishes"
      className="relative overflow-hidden bg-[#f8f3eb] px-5 py-20 text-[#24434a] sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* SECTION HEADER */}
        <div className="mb-12 text-center">
          <Heart
            className="mx-auto mb-4 text-[#bd9b67]"
            size={30}
            strokeWidth={1.3}
          />

          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#9b805b]">
            Olivia & Thomas
          </p>

          <h2 className="font-[var(--font-great-vibes)] text-5xl sm:text-6xl">
            Guest Messages & RSVP
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#647579]">
            Your presence would mean the world to us.
            Please let us know if you can join our special day
            and leave us a little message of love.
          </p>
        </div>

        {/* RSVP FORM */}
        <div className="mx-auto mb-14 max-w-2xl rounded-3xl border border-[#e6d8c3] bg-white p-6 shadow-sm sm:p-10">
          <h3 className="mb-7 text-center text-2xl">
            Will you join us?
          </h3>

          {/* INVITED GUEST COUNT */}
          <div className="mb-7 rounded-2xl border border-[#e6d8c3] bg-[#fffdf9] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#24434a]">
                  Invited Guests
                </p>

                <p className="mt-1 break-words text-xs text-[#647579]">
                  {guestName || "Guest"} · Maximum {maxGuests}{" "}
                  {maxGuests === 1 ? "guest" : "guests"}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-[#e9dfce] px-3 py-2 text-sm font-semibold text-[#24434a]">
                {attendingCount}{" "}
                {attendingCount === 1 ? "Guest" : "Guests"}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={decreaseGuestCount}
                disabled={attendingCount <= 1}
                aria-label="Decrease guest count"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c7ac] text-2xl transition hover:bg-[#e9dfce] disabled:cursor-not-allowed disabled:opacity-35"
              >
                −
              </button>

              <span
                aria-live="polite"
                className="min-w-10 text-center text-3xl font-semibold text-[#24434a]"
              >
                {attendingCount}
              </span>

              <button
                type="button"
                onClick={increaseGuestCount}
                disabled={attendingCount >= maxGuests}
                aria-label="Increase guest count"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c7ac] text-2xl transition hover:bg-[#e9dfce] disabled:cursor-not-allowed disabled:opacity-35"
              >
                +
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-[#647579]">
              Select how many invited guests will attend.
            </p>
          </div>

          {/* RSVP BUTTONS */}
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleRSVP("accepted")}
              aria-pressed={response === "accepted"}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 transition ${
                response === "accepted"
                  ? "border-[#a58a61] bg-[#e9dfce] text-[#24434a]"
                  : "border-[#e6d8c3] hover:bg-[#f8f3eb]"
              }`}
            >
              <CheckCircle2 size={20} />
              Joyfully Accept
            </button>

            <button
              type="button"
              onClick={() => handleRSVP("declined")}
              aria-pressed={response === "declined"}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 transition ${
                response === "declined"
                  ? "border-[#a58a61] bg-[#e9dfce] text-[#24434a]"
                  : "border-[#e6d8c3] hover:bg-[#f8f3eb]"
              }`}
            >
              <XCircle size={20} />
              Regretfully Decline
            </button>
          </div>

          {response && (
            <p className="mt-5 text-center text-sm text-[#647579]">
              {response === "accepted"
                ? `Thank you! You have accepted the invitation for ${attendingCount} ${
                    attendingCount === 1 ? "guest" : "guests"
                  }.`
                : "Thank you for letting us know. Your response is regretfully decline."}
            </p>
          )}
        </div>

        {/* GUEST MESSAGE FORM */}
        <div className="mx-auto mb-16 max-w-2xl">
          <div className="mb-7 text-center">
            <h3 className="font-[var(--font-great-vibes)] text-4xl">
              Leave a Message
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Share your wishes with the happy couple.
            </p>
          </div>

          <form
            onSubmit={handleMessageSubmit}
            className="space-y-5 rounded-3xl border border-[#e6d8c3] bg-white p-6 shadow-sm sm:p-9"
          >
            <div>
              <label
                htmlFor="guest-name"
                className="mb-2 block text-sm font-medium"
              >
                Your name
              </label>

              <input
                id="guest-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                maxLength={100}
                required
                className="w-full rounded-xl border border-[#e6d8c3] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#a58a61]"
              />
            </div>

            <div>
              <label
                htmlFor="guest-message"
                className="mb-2 block text-sm font-medium"
              >
                Your message
              </label>

              <textarea
                id="guest-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your wishes for Olivia & Thomas..."
                rows={5}
                maxLength={1000}
                required
                className="w-full resize-y rounded-xl border border-[#e6d8c3] bg-[#fffdf9] px-4 py-3 outline-none focus:border-[#a58a61]"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {message.length}/1000
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#24434a] px-6 py-4 text-white transition hover:bg-[#365c64]"
            >
              <Send size={17} />
              Send Your Wishes
            </button>

            {submitted && (
              <p className="text-center text-sm text-green-700">
                Your message has been added to this page. Thank you!
              </p>
            )}
          </form>
        </div>

        {/* DISPLAY MESSAGES */}
        <div>
          <h3 className="mb-8 text-center font-[var(--font-great-vibes)] text-4xl">
            Words of Love
          </h3>

          {messages.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Be the first to leave a message for the happy couple.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {messages.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#e6d8c3] bg-white p-6"
                >
                  <Heart
                    size={19}
                    className="mb-4 text-[#bd9b67]"
                  />

                  <p className="whitespace-pre-wrap break-words leading-7">
                    {item.message}
                  </p>

                  <div className="mt-5 border-t border-[#eee4d6] pt-4">
                    <p className="font-medium">{item.name}</p>

                    <p className="mt-1 text-xs text-gray-400">
                      {item.createdAt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
