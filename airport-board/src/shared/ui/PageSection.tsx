import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  id?: string;
  title?: string;
};

export function PageSection({
  children,
  className,
  description,
  eyebrow,
  id,
  title,
}: PageSectionProps) {
  const titleId = id && title ? `${id}-title` : undefined;

  return (
    <section
      aria-labelledby={titleId}
      className={cn("py-10 md:py-14", className)}
      id={id}
    >
      {(eyebrow || title || description) && (
        <div className="mb-7 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className="text-2xl font-semibold tracking-normal text-slate-950 md:text-3xl"
              id={titleId}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
