import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light" | "ocean" | "forest" | "sunset";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  accentColor: string;
}

const accentColors: Record<Theme, string> = {
  dark: "#3B82F6",
  light: "#2563EB",
  ocean: "#06B6D4",
  forest: "#22C55E",
  sunset: "#F97316",
};

export const themes: { id: Theme; label: string; color: string }[] = [
  { id: "dark", label: "Dark", color: "#3B82F6" },
  { id: "light", label: "Light", color: "#2563EB" },
  { id: "ocean", label: "Ocean", color: "#06B6D4" },
  { id: "forest", label: "Forest", color: "#22C55E" },
  { id: "sunset", label: "Sunset", color: "#F97316" },
];

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  accentColor: "#3B82F6",
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("diastas-theme") as Theme) || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("diastas-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor: accentColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
