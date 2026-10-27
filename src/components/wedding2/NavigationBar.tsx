
"use client";

import { useState } from "react";
import {
  House,
  Mail,
  Heart,
  Images,
  Clock,
  Church,
  PartyPopper,
  MapPin,
  CalendarDays,
  MessageCircleHeart,
  Gift,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero", Icon: House },
  { label: "Invitation", href: "#invitation-message", Icon: Mail },
  { label: "Our Story", href: "#couple-story", Icon: Heart },
  //{ label: "Gallery", href: "#gallery", Icon: Images },
  { label: "Countdown", href: "#countdown", Icon: Clock },
  //{ label: "Ceremony", href: "#ceremony", Icon: Church },
 // { label: "Reception", href: "#reception", Icon: PartyPopper },
  //{ label: "Location", href: "#location", Icon: MapPin },
  //{ label: "Events", href: "#events", Icon: CalendarDays },
  { label: "Guest Wishes", href: "#wishes", Icon: MessageCircleHeart },
  { label: "Thank You", href: "#thank-you", Icon: Gift },
];

export default function NavigationBar() {
  const [active, setActive] = useState("#home");

  const navigateTo = (href: string) => {
    setActive(href);

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav
      aria-label="Wedding navigation"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-max -translate-x-1/2"
    >
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/25 bg-[#102d36]/90 p-2 shadow-2xl backdrop-blur-xl sm:gap-2 sm:p-3">
        {navItems.map(({ label, href, Icon }) => (
          <button
            key={href}
            type="button"
            onClick={() => navigateTo(href)}
            aria-label={label}
            aria-current={active === href ? "location" : undefined}
            title={label}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-11 sm:w-11 ${
              active === href
                ? "bg-[#e7c995] text-[#102d36] shadow-md"
                : "text-white hover:bg-white/15 hover:text-[#e7c995]"
            }`}
          >
            <Icon size={20} strokeWidth={1.7} />
          </button>
        ))}
      </div>
    </nav>
  );
}
