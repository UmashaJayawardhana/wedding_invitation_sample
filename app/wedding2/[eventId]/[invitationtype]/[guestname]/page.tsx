"use client";

import { use, useState } from "react";

import Opening from "@/components/wedding2/Opening";
import Hero from "@/components/wedding2/hero";
import InvitationMessage from "@/components/wedding2/InvitationMessage";
import CoupleStory from "@/components/wedding2/CoupleStory";
import CountdownEventDetails from "@/components/wedding2/CountdownEventDetails";
import GuestMessages from "@/components/wedding2/GuestMessages";
import ThankYou from "@/components/wedding2/ThankYou";

interface PageProps {
  params: Promise<{
    eventId: string;
    invitationtype: string;
    guestname: string;
  }>;
}

export default function InvitationPage({ params }: PageProps) {
  const { eventId, invitationtype, guestname } = use(params);

  const [isOpen, setIsOpen] = useState(false);

  const decodedGuestName = guestname
    ? decodeURIComponent(guestname)
    : "Alex";

  const [guestName] = useState(decodedGuestName);

  // Temporary value for testing.
  // Replace this with the guest count loaded from Supabase.
  const guestCount = invitationtype.toLowerCase() === "family" ? 4 : 1;

  return (
    <main>
      {!isOpen ? (
        <Opening onOpen={() => setIsOpen(true)} />
      ) : (
        <>
          <section id="home">
            <Hero />
          </section>

          <section id="invitation">
            <InvitationMessage guestName={guestName} />
          </section>

          <section id="story">
            <CoupleStory />
          </section>

          <section id="countdown">
            <CountdownEventDetails />
          </section>

          <section id="wishes">
            <GuestMessages
              guestName={guestName}
              invitationId={eventId}
              guestCount={guestCount}
            />
          </section>

          <section id="thank-you">
            <ThankYou />
          </section>
        </>
      )}
    </main>
  );
}