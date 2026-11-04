import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Olivia & Thomas | Wedding Invitation",
  description: "Join us to celebrate our wedding.",
};

export default function Wedding2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

