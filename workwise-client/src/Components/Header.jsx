import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../src/assets/LogoImage.jpeg"

const Header = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addJob"
        >
          Add Job
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/postJob"
        >
          My Posted Jobs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bids"
        >
          My Bids
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bidRequest"
        >
          Bid Requests
        </NavLink>
      </li>
    </>
  );

  const { user, SignOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    SignOutUser()
      .then(() => {
        console.log("Sign-out successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar relative z-50 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 gap-2 rounded-box font-semibold w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="flex justify-center items-center cursor-pointer gap-2"
        >
          <img className="w-10" src={logo} alt="" />
          <span className="text-2xl font-bold text-[#0dcdbd]">WorkWise</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 font-semibold">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title={user.displayName}
            >
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <h2>{user.displayName}</h2>
              </li>
              <li>
                <a className="bg-red-600 text-white" onClick={handleLogOut}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#0dcdbd] text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
import { AuthContext } from "../Provider/AuthProvider";
