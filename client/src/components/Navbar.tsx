import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Group 2.png";
import logo2 from "../assets/Group 6.png";

// NAVIGATION LINK STYLING
const linkClass =
  "text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium";

const Navbar = () => {
  return (
    <header className="border-b border-gray-300 bg-[#FAF9FB]">
      <nav className="mx-auto flex h-23.25 max-w-360 items-center justify-between px-5 md:px-12 lg:px-42.5">
        {/* TASKDUTY LOGO */}
        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="TaskDuty Logo"
            className="w-28 object-contain md:w-36"
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* NEW TASK */}
          <NavLink to="/new" className={linkClass}>
            New Task
          </NavLink>

          {/* ALL TASKS */}
          <NavLink to="/tasks" className={linkClass}>
            All Tasks
          </NavLink>

          {/* PROFILE IMAGE */}
          <img
            src={logo2}
            alt="Profile"
            className="h-10 w-10 shrink-0 rounded-full object-cover md:h-12 md:w-12"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
