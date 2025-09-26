import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlicle";
import { removeConnections } from "../utils/connectionSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Theme state
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      navigate("/login");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="navbar shadow-sm mt-2">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          👨🏼‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal bg-base-300 rounded-xl px-3 shadow flex items-center">
              <li className="border-r border-gray-400 pr-3">
                <Link to="/">Home</Link>
              </li>
              <li className="border-r border-gray-400 px-3">
                <Link to="/connections">Connections</Link>
              </li>
              <li className="pl-3">
                <Link to="/requests">Requests</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end flex gap-2 items-center">
            <button
              className="btn btn-ghost btn-circle"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {theme === "light" ? "🌞" : "🌙"}
            </button>

            <span className="font-medium">Welcome, {user.firstName}</span>
            <div className="dropdown dropdown-end mx-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User profile"
                    src={user.photoUrl}
                    onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <a>Change Password</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;