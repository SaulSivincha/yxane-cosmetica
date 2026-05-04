"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealAnimation =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "fade-in-scale";

type RevealProps = {
  animation?: RevealAnimation;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
};

const animations: Record<RevealAnimation, string> = {
  "fade-in": "animate-fade-in",
  "fade-in-up": "animate-fade-in-up",
  "fade-in-down": "animate-fade-in-down",
  "fade-in-left": "animate-fade-in-left",
  "fade-in-right": "animate-fade-in-right",
  "fade-in-scale": "animate-fade-in-scale"
};

export function Reveal({
  animation = "fade-in-up",
  children,
  className = "",
  delay = 0,
  style
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.16 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} ${
        isVisible ? animations[animation] : "opacity-0"
      } motion-reduce:animate-none motion-reduce:opacity-100`}
      style={{
        ...style,
        animationDelay: isVisible && delay ? `${delay}ms` : undefined
      }}
    >
      {children}
    </div>
  );
}
