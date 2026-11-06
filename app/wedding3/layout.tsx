import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "නිශාදි & විරාජ් | Wedding Invitation",
  description: "Join us to celebrate our wedding day.",
};

export default function Wedding3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

