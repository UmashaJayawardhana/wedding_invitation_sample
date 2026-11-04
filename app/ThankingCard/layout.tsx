import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amaya & Kasun | Thank You Card",
  description: "Thank you for celebrating our wedding day with us.",
};

export default function ThankingCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

