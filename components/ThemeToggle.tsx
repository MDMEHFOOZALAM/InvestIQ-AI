"use client";

import { useEffect, useState } from "react";

const KEY = "investiq-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as "light" | "dark" | null;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    setMounted(true);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full bg-slate-800/60 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700/80 transition"
    >
      {mounted ? (theme === "dark" ? "🌙 Dark" : "☀️ Light") : "Theme"}
    </button>
  );
}
