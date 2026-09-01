"use client";

import type { MouseEvent } from "react";
import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

function getTheme(): Theme {
  const documentTheme = document.documentElement.dataset.theme;

  if (documentTheme === "dark" || documentTheme === "light") {
    return documentTheme;
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("themechange", onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("themechange", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event("themechange"));
}

function getRevealRadius(x: number, y: number) {
  const farthestX = Math.max(x, window.innerWidth - x);
  const farthestY = Math.max(y, window.innerHeight - y);

  return Math.hypot(farthestX, farthestY);
}

function setTransitionOrigin(x: number, y: number) {
  const root = document.documentElement;

  root.style.setProperty("--theme-x", `${x}px`);
  root.style.setProperty("--theme-y", `${y}px`);
  root.style.setProperty("--theme-r", `${getRevealRadius(x, y)}px`);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const isTransitioning = useRef(false);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (isTransitioning.current) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDocumentTheme(nextTheme);
      return;
    }

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(buttonRect.left + buttonRect.width / 2);
    const y = Math.round(buttonRect.top + buttonRect.height / 2);
    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;

    setTransitionOrigin(x, y);

    if (!startViewTransition) {
      setDocumentTheme(nextTheme);
      return;
    }

    isTransitioning.current = true;

    startViewTransition.call(document, () => {
      flushSync(() => {
        setDocumentTheme(nextTheme);
      });
    }).finished.finally(() => {
      isTransitioning.current = false;
    });
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center text-secondary transition-colors hover:text-foreground"
    >
      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 14.7A7.5 7.5 0 0 1 9.3 3a8.5 8.5 0 1 0 11.7 11.7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      )}
    </button>
  );
}
