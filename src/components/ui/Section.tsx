import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} className={className ? `section ${className}` : "section"} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
