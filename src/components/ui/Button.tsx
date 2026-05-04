import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const baseClasses =
  "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-yxane-ink text-white hover:bg-yxane-hover border border-yxane-ink",
  secondary:
    "bg-white/70 text-yxane-ink border border-yxane-mauve/40 hover:border-yxane-ink",
  ghost: "text-yxane-ink hover:bg-yxane-surface border border-transparent",
};

export function getButtonClasses({
  variant = "primary",
  className = "",
}: {
  variant?: ButtonVariant;
  className?: string;
}) {
  return `${baseClasses} ${variants[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClasses({ variant, className })}
      {...props}
    >
      {children}
    </button>
  );
}
