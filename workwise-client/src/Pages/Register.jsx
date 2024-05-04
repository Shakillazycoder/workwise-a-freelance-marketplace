const Register = () => {
    const [ShowPassword, SetShowPassword] = useState(false);
  
    const { CreateUser, setProfileUpdate } = useContext(AuthContext);
    const Navigate = useNavigate();
  
    const HandleRegister = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const name = formData.get("name");
      const image = formData.get("image");
      const email = formData.get("email");
      const password = formData.get("password");
  
      if (password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Password must be at least 6 characters</a>',
        });
  
        return;
      } else if (
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            '<a href="#">Your password must be at least 8 characters, at least a symbol, upper and lower case letters and a number</a>',
        });
        return;
      }
  
      CreateUser(email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName: name,
            photoURL: image,
          })
            .then(() => {
                Swal.fire({
                    icon: "sucess",
                    text: "User successfully",
                    footer: '<a href="#">Password must be at least 6 characters</a>',
                  })
              setProfileUpdate(true)
            })
            .catch((error) => {
              console.log(error);
            });
          e.target.reset();
          Navigate("/");
        })
        .catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Password must be at least 6 characters</a>',
              });
        });
    };
  
    return (
      <div>
        <Helmet>
          <title>Register - Find House</title>
          <meta name="description" content="Description of Register" />
        </Helmet>
        <div className="font-[sans-serif] text-[#333]">
          <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
              <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                <form onSubmit={HandleRegister} className="space-y-6">
                  <div className="mb-10">
                    <h3 className="text-3xl font-extrabold">Registration!</h3>
                    <p className="text-sm mt-4">
                      Registration to your account and explore a world of
                      possibilities. Your journey begins here.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">User Name</label>
                    <div className="relative flex items-center">
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Enter Your Name"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">photoURL</label>
                    <div className="relative flex items-center">
                      <input
                        name="image"
                        type="text"
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Image Link"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">User Email</label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Enter Your Email"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-4 h-4 absolute right-4"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                              d="M0 512h512V0H0Z"
                              data-original="#000000"
                            ></path>
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Password</label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type={ShowPassword ? "text" : "password"}
                        required
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Enter password"
                      />
                      {/* ShowPassword */}
                      <span
                        onClick={() => SetShowPassword(!ShowPassword)}
                        className="w-4 h-4 absolute right-4 cursor-pointer"
                      >
                        {ShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-blue-600 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div className="!mt-10">
                    <button
                      type="submit"
                      className="w-full shadow-xl rounded-2xl py-2.5 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Registration
                    </button>
                  </div>
                  <p className="text-sm !mt-10 text-center">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap cursor-pointer font-bold"
                    >
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
              <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
                <img
                  src="https://readymadeui.com/login-image.webp"
                  className="w-full h-full object-cover"
                  alt="Dining Experience"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;
  import { useContext, useState } from "react";
  import { FaRegEye } from "react-icons/fa6";
  import { FaRegEyeSlash } from "react-icons/fa6";
  import { Link, useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import { Helmet } from "react-helmet-async";
  import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
