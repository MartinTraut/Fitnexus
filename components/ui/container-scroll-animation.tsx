"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useReducedMotion, type MotionValue } from "framer-motion";

/** Hoehe der fixierten Kopfleiste — darunter darf nichts festgehalten werden. */
const NAV_OFFSET = 76;

/**
 * Vorschau-Karte, die sich beim Hereinscrollen aufrichtet und dann stehen bleibt.
 *
 * Die Reihenfolge ist der ganze Punkt und war vorher falsch herum:
 *
 * 1. AUFRICHTEN passiert waehrend die Karte ins Bild faehrt — der Fortschritt
 *    laeuft von "Oberkante betritt das Bild unten" bis "Oberkante erreicht den
 *    Haltepunkt". Vorher lief er erst danach, die Karte stand also schief fest
 *    und ist dann in 385px zugeklappt. Genau das wirkte wie ein Zucken.
 * 2. FESTHALTEN passiert erst, wenn sie flach ist. Man sieht eine ruhige,
 *    gerade Karte und hat Zeit, sie zu lesen.
 *
 * Ausserdem: festgehalten wird unterhalb der Navbar (top = NAV_OFFSET) und die
 * Karte sitzt oben buendig statt in einer bildschirmhohen Box zentriert —
 * zentriert schob sie ihre Oberkante hinter die Kopfleiste.
 *
 * Festgehalten wird nur, wenn die Karte unter der Navbar wirklich komplett
 * ins Fenster passt. Das wird gemessen, nicht geraten: die Karte ist auf jeder
 * Seite unterschiedlich hoch, eine reine Media-Query hat auf /fuer-kunden die
 * Oberkante hinter die Kopfleiste geschoben.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const isWide = useMediaQuery("(min-width: 768px)");
  const canPin = useFitsBelowNav(cardRef) && isWide;

  const { scrollYProgress } = useScroll({
    target: rangeRef,
    // 0 = Oberkante betritt das Bild von unten, 1 = Oberkante am Haltepunkt
    offset: ["start end", `start ${NAV_OFFSET}px`],
  });

  const tilted = isWide && !reduceMotion;

  // Ueber die volle Einfahrt aufrichten — lange Strecke, ruhige Bewegung.
  // 8 Grad statt 14: darueber wird der untere Rand zum Trapez und der
  // Inhalt unlesbar.
  const rotate = useTransform(scrollYProgress, [0, 1], [tilted ? 8 : 0, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 1], [tilted ? 0.94 : 1, 1], { clamp: true });
  const lift = useTransform(scrollYProgress, [0, 1], [tilted ? 40 : 0, 0], { clamp: true });

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">{titleComponent}</div>

      {/* Strecke: Einfahrt (1 Bildhoehe) + Haltestrecke. */}
      <div
        ref={rangeRef}
        className={["relative mt-10 md:mt-12", canPin ? "md:h-[190vh]" : ""].join(" ")}
      >
        <div className={canPin ? "md:sticky" : ""} style={canPin ? { top: NAV_OFFSET } : undefined}>
          <motion.div
            style={{
              rotateX: rotate,
              scale,
              y: lift,
              transformPerspective: 2000,
              transformOrigin: "center top",
              willChange: "transform",
            }}
            ref={cardRef}
            className={[
              "mx-auto w-full rounded-[28px] border border-[rgba(0,168,255,0.15)] bg-[#0D1320]",
              "p-2 md:p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
            ].join(" ")}
          >
            <div className="overflow-hidden rounded-[20px] bg-[#0B0F1A]">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * Passt das Element komplett zwischen Navbar und Fensterunterkante?
 * Gemessen wird die Layout-Hoehe (offsetHeight ignoriert Transforms), das
 * Aufrichten der Karte loest also keine Rueckkopplung aus.
 */
function useFitsBelowNav(ref: React.RefObject<HTMLElement | null>): boolean {
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Der Observer feuert direkt beim Beobachten — kein setState im Effektkoerper.
    const check = () => setFits(el.offsetHeight + NAV_OFFSET + 24 <= window.innerHeight);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [ref]);

  return fits;
}

/** matchMedia ohne setState im Effekt. */
function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
    {titleComponent}
  </motion.div>
);
