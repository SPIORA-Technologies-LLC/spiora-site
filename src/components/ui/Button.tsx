import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "outline";
  className?: string;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "onClick" | "children">;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  target,
  rel,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = ["btn", variant === "outline" ? "btn-outline" : "btn-primary", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link className={classes} href={href} target={target} rel={rel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
