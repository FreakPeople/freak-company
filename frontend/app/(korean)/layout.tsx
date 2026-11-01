import RootDocument from "@/app/RootDocument";
import { siteMetadata } from "@/lib/metadata";
export const metadata = siteMetadata("ko");
export default function KoreanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="ko">{children}</RootDocument>;
}
