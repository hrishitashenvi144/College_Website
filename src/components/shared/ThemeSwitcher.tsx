import { useTheme, themes } from "@/context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
            theme === t.id ? "border-foreground scale-125" : "border-transparent hover:scale-110"
          }`}
          style={{ backgroundColor: t.color }}
          title={t.label}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
