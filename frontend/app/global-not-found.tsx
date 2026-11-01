import RootDocument from "@/app/RootDocument";
import NotFound from "@/components/pages/NotFound";

export const metadata = {
  title: "404 · 길을 잃었나요? | Freak Makers",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return <RootDocument locale="ko"><NotFound /></RootDocument>;
}
