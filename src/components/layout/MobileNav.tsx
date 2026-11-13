"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavigationContent } from "@/types/content";
import { Logo } from "./Logo";

export type MobileNavProps = {
  navigation: NavigationContent;
};

const DIALOG_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 48rem)";

/**
 * Mobile menu built on the native <dialog> (showModal): focus trap, Esc to close and an
 * inert background come from the browser. Focus returns to the trigger when the menu is
 * dismissed; after choosing a link, focus follows the in-page navigation instead.
 */
export function MobileNav({ navigation }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigatedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu if the viewport grows to the desktop layout while it is open.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const open = () => {
    navigatedRef.current = false;
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const close = () => dialogRef.current?.close();

  const handleClose = () => {
    setIsOpen(false);
    if (!navigatedRef.current) triggerRef.current?.focus();
  };

  const handleLinkClick = () => {
    navigatedRef.current = true;
    close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={DIALOG_ID}
        onClick={open}
        className="-mr-1.5 rounded-md p-1.5 md:hidden"
      >
        <Icon name="icon-menu" />
      </button>

      <dialog
        ref={dialogRef}
        id={DIALOG_ID}
        aria-label="Menu"
        onClose={handleClose}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background-light-yellow p-0 text-text-primary opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-200 backdrop:bg-text-primary/40 open:translate-y-0 open:opacity-100 motion-reduce:transition-none md:hidden starting:open:-translate-y-2 starting:open:opacity-0"
      >
        <div className="flex h-17 items-center justify-between border-b border-line-1 px-5">
          <Logo onClick={handleLinkClick} />
          <button type="button" aria-label="Close menu" onClick={close} className="-mr-1.5 rounded-md p-1.5">
            <Icon name="icon-close" />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-5 py-8">
          <ul className="flex flex-col">
            {navigation.links.map((link) => (
              <li key={link.label} className="border-b border-line-1">
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-4 font-heading text-mobile-h5 text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href={navigation.cta.href} onClick={handleLinkClick} fullWidth>
              {navigation.cta.label}
            </ButtonLink>
            <ButtonLink href={navigation.login.href} onClick={handleLinkClick} variant="secondary" fullWidth>
              {navigation.login.label}
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </>
  );
}
