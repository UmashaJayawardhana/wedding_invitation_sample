"use client";

import { useState } from "react";

import Opening from "@/components/wedding2/Opening";
import Hero from "@/components/wedding2/hero";
import InvitationMessage from "@/components/wedding2/InvitationMessage";
import CoupleStory from "@/components/wedding2/CoupleStory";
import CountdownEventDetails from "@/components/wedding2/CountdownEventDetails";
import GuestMessages from "@/components/wedding2/GuestMessages";

interface PageProps {
  params: Promise<{
    id: string;
    guestName: string;
  }>;
}

export default function InvitationPage({ params }: PageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("Alex");

  // Resolve the guest name from the URL using a separate server page
  // if your Next.js version provides params as a Promise.

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
    invitationId={id}
  />
</section>
        </>
      )}
    </main>
  );
}