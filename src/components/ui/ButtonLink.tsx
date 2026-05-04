import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  getButtonClasses,
  type ButtonVariant,
} from "@/components/ui/Button";

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    variant?: ButtonVariant;
    children: ReactNode;
  };

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={getButtonClasses({ variant, className })} {...props}>
      {children}
    </Link>
  );
}
