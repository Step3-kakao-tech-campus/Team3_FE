"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

function ModalLink({ href, children, className }: Props) {
  const searchParam = useSearchParams();
  const queryString = searchParam.toString() && `?${searchParam.toString()}`;
  return (
    <Link href={`${href}${queryString}`} className={className}>
      {children}
    </Link>
  );
}

export default ModalLink;
