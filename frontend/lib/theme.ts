export type Theme = "light" | "dark";
export const themeStorageKey = "freak-theme";

// Runs in <head> before paint; no request or project data leaves the browser.
export const themeInitScript = `(()=>{let t;try{t=localStorage.getItem('freak-theme')}catch{}const d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'})()`;

export function themeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
export function serverThemeSnapshot(): Theme {
  return "light";
}
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    /* Storage may be unavailable. The current page still changes theme. */
  }
  window.dispatchEvent(new Event("freak-theme-change"));
}
export function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const applyPreference = () => {
    let preference: string | null = null;
    try {
      preference = localStorage.getItem(themeStorageKey);
    } catch {
      /* Use the system preference. */
    }
    document.documentElement.dataset.theme =
      preference === "dark" || (preference !== "light" && media.matches)
        ? "dark"
        : "light";
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey || event.key === null) applyPreference();
  };
  media.addEventListener("change", applyPreference);
  window.addEventListener("storage", onStorage);
  window.addEventListener("freak-theme-change", onChange);
  return () => {
    media.removeEventListener("change", applyPreference);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("freak-theme-change", onChange);
  };
}
