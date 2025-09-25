import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async()=>{
    try {
      await axios .post(BASE_URL + "/logout" ,{} , {withCredentials : true})
      dispatch(removeUser())
      navigate("/login")
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👨🏼‍💻 DevTinder</Link>
      </div>
      <div className="flex gap-2 items-center">
        {user && (
          <>
            {/* 👇 Welcome message */}
            <span className="font-medium">Welcome, {user.firstName}</span>

            {/* 👇 Avatar dropdown */}
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User profile" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
