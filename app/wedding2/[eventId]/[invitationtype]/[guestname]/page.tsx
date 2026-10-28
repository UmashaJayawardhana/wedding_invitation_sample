"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import Opening from "@/components/wedding2/Opening";
import Hero from "@/components/wedding2/hero";
import InvitationMessage from "@/components/wedding2/InvitationMessage";
import CoupleStory from "@/components/wedding2/CoupleStory";
import CountdownEventDetails from "@/components/wedding2/CountdownEventDetails";
import GuestMessages from "@/components/wedding2/GuestMessages";
import ThankYou from "@/components/wedding2/ThankYou";

export interface WeddingInvitationRecord {
  wedding_invitation_id: number;
  event_id: number;
  guest_name: string;
  guest_token?: string;
  invitation_type: string;
  number_of_guests: number;
  rsvp_status: "pending" | "accepted" | "declined" | string;
  attending_count: number | null;
  responded_at: string | null;
  wish_message: string | null;
  wish_created_at: string | null;
  created_at?: string;
}

interface PageProps {
  params: Promise<{
    eventId?: string;
    invitationtype?: string;
    invitationType?: string;
    type?: string;
    guestname?: string;
    guestName?: string;
  }>;
}

export default function InvitationPage({ params }: PageProps) {
  const rawParams = (use(params) || {}) as Record<string, string | undefined>;

  const eventId = rawParams.eventId || rawParams.id || "";
  const rawTypeParam =
    rawParams.invitationtype ||
    rawParams.invitationType ||
    rawParams.type ||
    rawParams.invitation_type ||
    "";
  const rawGuestParam =
    rawParams.guestname ||
    rawParams.guestName ||
    rawParams.name ||
    "";

  const [isOpen, setIsOpen] = useState(false);

  const decodedGuestName = rawGuestParam
    ? decodeURIComponent(rawGuestParam).trim()
    : "Guest";

  // Resolve initial invitation type from URL parameter
  const cleanParamType = decodeURIComponent(rawTypeParam).trim().toLowerCase();
  const initialType = cleanParamType.includes("family")
    ? "family"
    : cleanParamType.includes("couple")
    ? "couple"
    : "single";

  const [guestName, setGuestName] = useState(decodedGuestName);
  const [invitationType, setInvitationType] = useState<string>(initialType);
  const [invitation, setInvitation] = useState<WeddingInvitationRecord | null>(null);
  const [guestCount, setGuestCount] = useState<number>(() => {
    return initialType === "family" ? 4 : initialType === "couple" ? 2 : 1;
  });

  useEffect(() => {
    let isMounted = true;

    async function loadInvitation() {
      try {
        const num = Number(eventId);
        let found: WeddingInvitationRecord | null = null;

        // 1. Try matching by wedding_invitation_id if numeric
        if (!isNaN(num) && num > 0) {
          const { data, error } = await supabase
            .from("wedding_invitations")
            .select("*")
            .eq("wedding_invitation_id", num)
            .maybeSingle();

          if (!error && data) {
            found = data;
          }
        }

        // 2. Try matching by event_id + guest_name
        if (!found && !isNaN(num) && decodedGuestName && decodedGuestName !== "Guest") {
          const primaryName = decodedGuestName.split(/[&+]|\band\b|\bfamily\b/i)[0].trim();

          const { data, error } = await supabase
            .from("wedding_invitations")
            .select("*")
            .eq("event_id", num)
            .ilike("guest_name", `%${primaryName || decodedGuestName}%`)
            .maybeSingle();

          if (!error && data) {
            found = data;
          }
        }

        // 3. Try matching by guest_token
        if (!found && eventId) {
          const { data, error } = await supabase
            .from("wedding_invitations")
            .select("*")
            .eq("guest_token", eventId)
            .maybeSingle();

          if (!error && data) {
            found = data;
          }
        }

        if (isMounted && found) {
          setInvitation(found);
          if (found.guest_name) {
            setGuestName(found.guest_name);
          }
          if (found.number_of_guests) {
            setGuestCount(found.number_of_guests);
          }
          if (found.invitation_type) {
            const dbType = found.invitation_type.trim().toLowerCase();
            if (dbType.includes("family")) {
              setInvitationType("family");
            } else if (dbType.includes("couple")) {
              setInvitationType("couple");
            } else {
              setInvitationType("single");
            }
          }
        }
      } catch (err) {
        console.error("Error loading invitation from Supabase:", err);
      }
    }

    loadInvitation();

    return () => {
      isMounted = false;
    };
  }, [eventId, decodedGuestName]);

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
            <InvitationMessage
              guestName={guestName}
              invitationType={invitationType}
            />
          </section>

          <section id="story">
            <CoupleStory />
          </section>

          <section id="countdown">
            <CountdownEventDetails />
          </section>

          <section id="wishes">
{invitation && (
  <GuestMessages
    guestName={guestName}
    invitationId={
      invitation.guest_token ?? invitation.wedding_invitation_id
    }
    guestCount={invitation.number_of_guests ?? 1}
    invitation={invitation}
  />
)}
          </section>

          <section id="thank-you">
            <ThankYou />
          </section>
        </>
      )}
    </main>
  );
}