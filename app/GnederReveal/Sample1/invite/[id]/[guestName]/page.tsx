"use client";

import { use, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

import Opening from "@/components/genderreveal/Opening";
import Hero from "@/components/genderreveal/Hero";
import ParentGallery from "@/components/genderreveal/ParentGallery";
import InvitationMessage from "@/components/genderreveal/InvitationMessage";
import EventDetails from "@/components/genderreveal/EventDetails";
import VoteSection from "@/components/genderreveal/VoteSection";
import TeamResults from "@/components/genderreveal/TeamResults";
import GuestWish from "@/components/genderreveal/GuestWish";
import Ending from "@/components/genderreveal/Ending";

interface PageProps {
  params: Promise<{
    id: string;
    guestName: string;
  }>;
}

interface Invitation {
  gr_invitation_id: number;
  event_id: number;
  guest_name: string;
  invitation_type: string | null;
  vote: "boy" | "girl" | null;
  wish_message: string | null;
  wish_created_at: string | null;
  created_at: string;
}

export default function InvitationPage({
  params,
}: PageProps) {
  // Next.js 16: params is a Promise
  const { id, guestName } = use(params);

  const invitationId = Number(id);
  const urlGuestName = decodeURIComponent(guestName);

  // Controls Opening screen / Full invitation
  const [isOpen, setIsOpen] = useState(false);

  // Current invitation
  const [invitation, setInvitation] =
    useState<Invitation | null>(null);

  // All invitations belonging to this event
  const [guests, setGuests] = useState<Invitation[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // UPDATE VOTE IMMEDIATELY
  // ==========================================

  const handleVoteUpdated = (
    invitationId: number,
    vote: "boy" | "girl"
  ) => {
    // Update current invitation
    setInvitation((prev) =>
      prev
        ? {
          ...prev,
          vote,
        }
        : prev
    );

    // Update event guest list immediately
    setGuests((prev) =>
      prev.map((guest) =>
        guest.gr_invitation_id === invitationId
          ? {
            ...guest,
            vote,
          }
          : guest
      )
    );
  };

  useEffect(() => {
    async function loadInvitation() {
      // Check invitation ID
      if (!Number.isInteger(invitationId)) {
        setError("Invalid invitation ID.");
        setLoading(false);
        return;
      }

      try {
        // ==========================================
        // 1. GET CURRENT INVITATION
        // ==========================================

        const {
          data: invitationData,
          error: invitationError,
        } = await supabase
          .from("gr_invitations")
          .select(`
            gr_invitation_id,
            event_id,
            guest_name,
            invitation_type,
            vote,
            wish_message,
            wish_created_at,
            created_at
          `)
          .eq("gr_invitation_id", invitationId)
          .maybeSingle();

        if (invitationError) {
          console.error(
            "Invitation error:",
            invitationError
          );

          setError(
            "Something went wrong while loading the invitation."
          );

          setLoading(false);
          return;
        }

        // Invitation doesn't exist
        if (!invitationData) {
          setError("Invitation Not Found.");
          setLoading(false);
          return;
        }

        // ==========================================
        // 2. CHECK GUEST NAME
        // ==========================================

        if (
          urlGuestName.toLowerCase() !==
          invitationData.guest_name.toLowerCase()
        ) {
          setError("Invitation Not Found.");
          setLoading(false);
          return;
        }

        // Save current invitation
        setInvitation(invitationData);

        // ==========================================
        // 3. GET ALL INVITATIONS FOR SAME EVENT
        // ==========================================

        const {
          data: eventInvitations,
          error: eventError,
        } = await supabase
          .from("gr_invitations")
          .select(`
            gr_invitation_id,
            event_id,
            guest_name,
            invitation_type,
            vote,
            wish_message,
            wish_created_at,
            created_at
          `)
          .eq(
            "event_id",
            invitationData.event_id
          )
          .order("created_at", {
            ascending: true,
          });

        if (eventError) {
          console.error(
            "Event invitations error:",
            eventError
          );
        }

        // Save all event guests
        setGuests(eventInvitations ?? []);
      } catch (error) {
        console.error(
          "Unexpected error:",
          error
        );

        setError(
          "Something went wrong while loading the invitation."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvitation();
  }, [invitationId, urlGuestName]);

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <div className="mb-4 text-5xl">
            👶
          </div>

          <p className="font-serif text-xl text-[#695548]">
            Preparing your invitation...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR SCREEN
  // ==========================================

  if (error || !invitation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-6">
        <div className="text-center">
          <div className="mb-4 text-5xl">
            💌
          </div>

          <h1 className="font-serif text-3xl text-[#514238]">
            {error || "Invitation Not Found"}
          </h1>
        </div>
      </main>
    );
  }

  // ==========================================
  // MAIN INVITATION
  // ==========================================

  return (
    <main className="min-h-screen bg-[#fffaf7]">

      {/* ======================================
          OPENING SCREEN
          ====================================== */}

      <AnimatePresence mode="wait">
        {!isOpen && (
          <Opening
            guestName={invitation.guest_name}
            onOpen={() => {
              setIsOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* ======================================
          FULL INVITATION
          ONLY SHOWN AFTER CLICK
          ====================================== */}

      {isOpen && (
        <>
          {/* HERO */}

          <Hero
            parentOne="Kasun"
            parentTwo="Amaya"
          />

          {/* PARENT / PREGNANCY GALLERY */}

          <ParentGallery />

          {/* INVITATION MESSAGE */}

          <InvitationMessage
            guestName={invitation.guest_name}
            parentOne="Kasun"
            parentTwo="Amaya"
          />

          {/* EVENT DETAILS */}

          <EventDetails
            eventDate="December 20, 2026"
            eventTime="4:00 PM"
            venue="Shangri-La Colombo"
            address="Colombo, Sri Lanka"
            mapsUrl="https://maps.app.goo.gl/pTQNpdidJatXPLC48"
          />

          {/* VOTE */}

          <VoteSection
            guestName={invitation.guest_name}
            invitationId={invitation.gr_invitation_id}
            currentVote={invitation.vote}
            onVoteUpdated={handleVoteUpdated}
          />

          {/* TEAM RESULTS */}

          <TeamResults
            invitations={guests}
          />

          {/* GUEST WISH */}

          <GuestWish
            guestName={invitation.guest_name}
            invitationId={invitation.gr_invitation_id}
            currentWish={invitation.wish_message}
            wishes={guests}
          />

          {/* ENDING */}

          <Ending
            parentOne="Kasun"
            parentTwo="Amaya"
          />
        </>
      )}
    </main>
  );
}