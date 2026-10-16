"use client";

import { use, useState } from "react";

import Opening from "@/components/weddingthanking/Opening";
import Hero from "@/components/weddingthanking/Hero";
import ThankYouMessage from "@/components/weddingthanking/ThankYouMessage";
import WeddingGallery from "@/components/weddingthanking/WeddingGallery";
import PhotoUpload from "@/components/weddingthanking/PhotoUpload";
import GuestPhotoGallery from "@/components/weddingthanking/GuestPhotoGallery";
import Ending from "@/components/weddingthanking/Ending";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InvitePage({ params }: PageProps) {
  const { id } = use(params);

  const [opened, setOpened] = useState(false);

  // Used to refresh GuestPhotoGallery immediately
  // after a successful photo upload.
  const [galleryRefresh, setGalleryRefresh] = useState(0);

  const parsedId = Number(id);
  const eventId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : 3;

  if (!opened) {
    return (
      <Opening
        brideName="Amaya"
        groomName="Kasun"
        onOpen={() => setOpened(true)}
      />
    );
  }

  return (
    <main className="w-full">

      {/* Hero */}
      <Hero
        brideName="Amaya"
        groomName="Kasun"
      />

      {/* Thank You Message */}
      <ThankYouMessage
        brideName="Amaya"
        groomName="Kasun"
        weddingDate="20 December 2026"
      />

      {/* Creator's Wedding Photos */}
      <WeddingGallery />

      {/* Guest Photo Upload */}
      <PhotoUpload
        eventId={eventId}
        onUploadSuccess={() =>
          setGalleryRefresh((prev) => prev + 1)
        }
      />

      {/* Guest Uploaded Photos */}
      <GuestPhotoGallery
        eventId={eventId}
        refreshKey={galleryRefresh}
      />

      {/* Ending Section */}
      <Ending
        brideName="Amaya"
        groomName="Kasun"
      />

    </main>
  );
}