import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 bg-gray-800 text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg shadow-md transition"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
