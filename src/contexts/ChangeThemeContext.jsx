import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ChangeThemeContext = createContext();

const THEMES = ["warm", "cool", "dark"];

function ChangeThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "warm";
  });

  useEffect(
    function () {
      const root = document.documentElement;

      THEMES.forEach((t) => root.classList.remove(`${t}-mode`));
      root.classList.add(`${theme}-mode`);

      localStorage.setItem("theme", theme);
    },
    [theme],
  );

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === "theme" && e.newValue && THEMES.includes(e.newValue)) {
        setTheme(e.newValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isTheme: theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ChangeThemeContext.Provider value={value}>
      {children}
    </ChangeThemeContext.Provider>
  );
}

function useChangeTheme() {
  const context = useContext(ChangeThemeContext);

  if (context === undefined)
    throw new Error("ChangeThemeContext was used outside ChangeThemeProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ChangeThemeProvider, useChangeTheme };
