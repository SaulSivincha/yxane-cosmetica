import type { Metadata } from "next";
import { FindUsPage } from "@/features/find-us/FindUsPage";

export const metadata: Metadata = {
  title: "Encuéntranos",
  description:
    "Ubicación y canales de contacto de Yxane Cosmética Natural en Arequipa.",
};

export default function Page() {
  return <FindUsPage />;
}
