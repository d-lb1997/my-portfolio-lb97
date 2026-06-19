"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useVisitorCursor } from "@/lib/cursor-context";
import { useCanvas } from "@/lib/canvas-context";
import { NAV_ITEMS, pathnameToPageId, type PageId } from "@/lib/pages";
import { ThemeToggleButton } from "./ThemeToggle";

const MENU_EASE = [0.4, 0, 0.2, 1] as const;

const MOBILE_MENU_LABELS: Record<PageId, string> = {
  home: "Home",
  about: "About me",
  work: "Work",
  contact: "Contact",
};

function NavLink({
  label,
  isActive,
  ready,
  color,
  disabled,
  onClick,
  className = "",
}: {
  label: string;
  isActive: boolean;
  ready: boolean;
  color: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={`relative border-none bg-transparent text-[14px] font-medium uppercase tracking-[0.08em] text-text-primary cursor-pointer transition-opacity duration-200 disabled:cursor-wait ${
        isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
      } ${className}`}
      style={
        isActive && ready
          ? {
              textDecoration: "underline",
              textDecorationColor: color,
              textDecorationThickness: "2px",
              textUnderlineOffset: "6px",
            }
          : undefined
      }
      data-no-pan
    >
      {label}
    </button>
  );
}

function MobileMenuNavLink({
  label,
  isActive,
  disabled,
  onClick,
}: {
  label: string;
  isActive: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={`border-none bg-transparent text-[clamp(1.625rem,6.5vw,2.125rem)] font-bold uppercase tracking-[0.04em] text-white transition-opacity duration-200 disabled:cursor-wait ${
        isActive ? "opacity-100" : "opacity-45"
      }`}
      style={
        isActive
          ? {
              textDecoration: "underline",
              textDecorationColor: "#ffffff",
              textDecorationThickness: "3px",
              textUnderlineOffset: "0.35em",
            }
          : undefined
      }
      data-no-pan
    >
      {label}
    </button>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-0 block h-[2px] w-full rounded-full bg-text-primary"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.24, ease: MENU_EASE }}
      />
      <motion.span
        className="absolute left-0 top-[7px] block h-[2px] w-full rounded-full bg-text-primary"
        animate={open ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.18, ease: MENU_EASE }}
      />
      <motion.span
        className="absolute left-0 top-[14px] block h-[2px] w-full rounded-full bg-text-primary"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.24, ease: MENU_EASE }}
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const activePageId = pathnameToPageId(pathname);
  const { navigateToPage, isNavigating } = useCanvas();
  const { color, ready } = useVisitorCursor();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    navigateToPage(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 hidden items-center justify-center px-8 py-6 lg:flex md:px-12">
        <ul className="flex items-center gap-6 md:gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                label={item.label}
                isActive={activePageId === item.id}
                ready={ready}
                color={color}
                disabled={isNavigating}
                onClick={() => navigateToPage(item.href)}
              />
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-site-menu"
        className="fixed top-6 right-6 z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-toggle-bg shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer lg:hidden"
        data-no-pan
      >
        <MenuIcon open={menuOpen} />
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-site-menu"
            className="mobile-menu-overlay fixed inset-0 z-[90] flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: MENU_EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 cursor-pointer border-none bg-transparent"
              onClick={() => setMenuOpen(false)}
            />

            <nav className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-8">
              <ul className="pointer-events-auto flex flex-col items-center gap-10 sm:gap-12">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.3,
                      ease: MENU_EASE,
                      delay: 0.05 + index * 0.05,
                    }}
                  >
                    <MobileMenuNavLink
                      label={MOBILE_MENU_LABELS[item.id]}
                      isActive={activePageId === item.id}
                      disabled={isNavigating}
                      onClick={() => handleNavigate(item.href)}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="pointer-events-auto relative z-10 flex justify-center px-8 pb-12 pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: MENU_EASE, delay: 0.2 }}
            >
              <ThemeToggleButton showLabel variant="overlay" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
