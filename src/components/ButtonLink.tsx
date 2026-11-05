import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export default function ButtonLink({
  href,
  children,
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = clsx(
    "group block relative w-fit text-center rounded-xs border text-white leading-none border-white hover:text-primary transition-colors duration-300 px-6 py-3",
    className,
  );

  const content = (
    <>
      <span className="absolute bottom-0 left-0 w-full h-0 bg-white group-hover:h-full transition-all duration-300" />
      <span className="relative text-lg font-title">{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
