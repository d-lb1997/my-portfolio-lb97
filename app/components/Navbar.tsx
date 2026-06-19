"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useVisitorCursor } from "@/lib/cursor-context";
import { useCanvas } from "@/lib/canvas-context";
import { NAV_ITEMS, pathnameToPageId } from "@/lib/pages";
import { ThemeToggleButton } from "./ThemeToggle";

const MENU_EASE = [0.4, 0, 0.2, 1] as const;

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
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="mobile-menu-backdrop fixed inset-0 z-[90] bg-black/20 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: MENU_EASE }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              id="mobile-site-menu"
              className="fixed top-0 right-0 z-[95] flex h-full w-[min(100%,19rem)] flex-col border-l border-border-subtle bg-surface-white/90 px-8 pb-10 pt-24 shadow-2xl backdrop-blur-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: MENU_EASE }}
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-7">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{
                      duration: 0.28,
                      ease: MENU_EASE,
                      delay: 0.04 + index * 0.04,
                    }}
                  >
                    <NavLink
                      label={item.label}
                      isActive={activePageId === item.id}
                      ready={ready}
                      color={color}
                      disabled={isNavigating}
                      onClick={() => handleNavigate(item.href)}
                      className="text-[16px]"
                    />
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-auto border-t border-border-subtle pt-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: MENU_EASE, delay: 0.12 }}
              >
                <ThemeToggleButton
                  showLabel
                  className="w-full justify-start rounded-xl px-3 py-2"
                />
              </motion.div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
