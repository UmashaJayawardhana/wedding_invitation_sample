import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarah & Deen | Wedding Invitation",
  description: "Join us to celebrate the wedding of Sarah and Deen.",
};

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

