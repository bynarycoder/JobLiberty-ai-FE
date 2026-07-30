"use client";

import React from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";

interface OpportunityLinkButtonProps extends Omit<ButtonProps, "asChild" | "disabled"> {
  url?: string;
  children: React.ReactNode;
}

/** Opens only a non-empty normalized opportunity URL; unavailable links remain visibly disabled. */
export function OpportunityLinkButton({ url, children, ...buttonProps }: OpportunityLinkButtonProps) {
  const href = url?.trim();

  if (href) {
    return (
      <Button asChild {...buttonProps}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <span title="No application link available.">
      <Button {...buttonProps} disabled aria-label="No application link available.">
        {children}
      </Button>
    </span>
  );
}
