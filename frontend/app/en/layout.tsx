import RootDocument from "@/app/RootDocument";
import { siteMetadata } from "@/lib/metadata";
export const metadata = siteMetadata("en");
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
