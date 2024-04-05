import { Theme } from "@/features/theme/themeSlice";

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("dark", "light");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}
