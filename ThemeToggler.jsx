import { useState, useEffect } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");

  // Apply the theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </li>
    </ul>
  );
};

export default ThemeToggler;