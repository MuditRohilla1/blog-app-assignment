import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/20 dark:bg-black/30 border-b border-white/10 dark:border-white/20 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-0">
        {/* App Title */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white hover:opacity-80 transition"
        >
          📝 MyBlog
        </Link>

        {/* Right Side Actions */}
        <div className="flex flex-col xs:flex-row items-center gap-2">
          <Link
            to="/new"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + New Post
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
