import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gender Reveal Invitation",
  description: "Join us for our special Gender Reveal celebration!",
};

export default function GenderRevealLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

