import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Join us to celebrate our wedding day.",
};

export default function Wedding1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

