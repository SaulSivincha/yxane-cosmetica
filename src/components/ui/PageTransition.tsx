import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
  pageKey: string;
};

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <div
      key={pageKey}
      className="animate-page-transition motion-reduce:animate-none"
    >
      {children}
    </div>
  );
}
