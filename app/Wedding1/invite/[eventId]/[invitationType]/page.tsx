"use client";

import { use, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Opening from "@/components/Opening";
import Hero from "@/components/Hero";
import InvitationMessage from "@/components/InvitationMessage";
import CoupleStory from "@/components/CoupleStory";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import WeddingGallery from "@/components/WeddingGallery";
import GuestWishes from "@/components/GuestWishes";

interface PageProps {
  params: Promise<{
    eventId: string;
    invitationType: string;
  }>;
}

export default function InvitationPage({ params }: PageProps) {
  const { eventId, invitationType } = use(params);

  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");

  const eventIdNumber = Number(eventId);
  const type = invitationType.toLowerCase();

  return (
    <main className="min-h-screen bg-[#f7f1e8]">

      <AnimatePresence>
        {!isOpen && (
          <Opening
            onOpen={(name) => {
              setGuestName(name);
              setIsOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {isOpen && (
        <>
          <Hero />

          <InvitationMessage
            guestName={guestName}
            invitationType={type}
          />

          <CoupleStory />

          <EventDetails />

          <Countdown />

          <WeddingGallery />

          <GuestWishes
            eventId={eventIdNumber}
            guestName={guestName}
          />
        </>
      )}

    </main>
  );
}