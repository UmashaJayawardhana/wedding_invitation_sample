"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface GuestPhoto {
  id: number;
  upload_by: string | null;
  guest_image_url: string | null;
}

interface GuestPhotoGalleryProps {
  eventId: number;
  refreshKey: number;
}

export default function GuestPhotoGallery({
  eventId,
  refreshKey,
}: GuestPhotoGalleryProps) {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GuestPhoto | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      // Validate eventId before running query to avoid PostgreSQL type errors
      if (!eventId || isNaN(eventId)) {
        console.warn("GuestPhotoGallery: Invalid or missing eventId:", eventId);
        setPhotos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setFetchError(null);

      const { data, error } = await supabase
        .from("wedding_thankyou")
        .select("id, upload_by, guest_image_url")
        .eq("event_id", eventId)
        .not("guest_image_url", "is", null)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error loading guest photos:", error);
        setFetchError(error.message);
        setPhotos([]);
      } else {
        setPhotos(data || []);
      }

      setLoading(false);
    };

    loadPhotos();
  }, [eventId, refreshKey]);

  return (
    <section className="bg-[#dcecf2] px-5 py-16">
      <div className="mx-auto w-full max-w-[520px]">

        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6b56d]" />
            <span className="text-[#d6b56d]">✦</span>
            <span className="h-px w-10 bg-[#d6b56d]" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#b29452]">
            From Our Guests
          </p>

          <h2 className="mt-3 font-serif text-4xl font-light text-[#30434b]">
            Shared Memories
          </h2>

          <p className="mt-4 font-serif text-base leading-7 text-[#5d6d73]">
            Beautiful moments shared by the people who made our day special.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-10 text-center">
            <p className="font-serif text-[#30434b]">Loading shared memories...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && fetchError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            <p>Could not load memories: {fetchError}</p>
          </div>
        )}

        {/* Empty state (replaces the silent return null) */}
        {!loading && !fetchError && photos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#b8cbd3] bg-white/50 px-6 py-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d6b56d]/15 text-xl">
              📸
            </div>
            <p className="font-serif text-lg text-[#30434b]">
              No shared memories yet
            </p>
            <p className="mt-2 text-sm text-[#5d6d73]">
              Be the first to share your favorite moments using the form above!
            </p>
          </div>
        )}

        {/* Photos Grid */}
        {!loading && !fetchError && photos.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={photo.guest_image_url || ""}
                    alt={`Photo shared by ${photo.upload_by || "Guest"}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="px-3 py-3 text-center">
                  <p className="font-serif text-sm font-medium text-[#30434b]">
                    {photo.upload_by || "Guest"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40"
          >
            ✕
          </button>
          <div
            className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.guest_image_url || ""}
              alt={`Photo shared by ${selectedPhoto.upload_by || "Guest"}`}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
            />
            <p className="mt-3 text-center font-serif text-base text-[#30434b]">
              Shared by <span className="font-semibold">{selectedPhoto.upload_by || "Guest"}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}