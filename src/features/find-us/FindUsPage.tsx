import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FindUsPage() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Encuéntranos
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-yxane-ink md:text-6xl">
          Donde encontrarnos
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Visítanos en José Luis Bustamante y Rivero, Arequipa, Perú, 054.
          También coordinamos pedidos por WhatsApp.
        </p>
      </div>

      <div className="mx-auto mt-14 mb-16 max-w-5xl overflow-hidden rounded-2xl border border-yxane-ink shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.6670997537926!2d-71.56970058887346!3d-16.39091208427085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a76b0152bdd%3A0x5c5fca583ba44320!2sJos%C3%A9%20Luis%20Bustamante%20y%20Rivero%20054%2C%20Arequipa%2004044!5e0!3m2!1ses!2spe!4v1777918531243!5m2!1ses!2spe"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
        <InfoCard icon={<MapPin />} label="Punto físico">
          José Luis Bustamante y Rivero, Arequipa, Perú, 054
        </InfoCard>
        <InfoCard icon={<Phone />} label="WhatsApp">
          956 580 463
        </InfoCard>
        <InfoCard icon={<Instagram />} label="Instagram">
          @yxane_natural
        </InfoCard>
      </div>

      <div className="mt-12 flex justify-center">
        <ButtonLink
          href="https://wa.me/51956580463"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          Escribir por WhatsApp
        </ButtonLink>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-lg border border-yxane-line/80 bg-white/75 p-6 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yxane-surface text-yxane-ink">
        {icon}
      </div>
      <h2 className="mt-5 font-serif text-xl text-yxane-ink">{label}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">{children}</p>
    </article>
  );
}
