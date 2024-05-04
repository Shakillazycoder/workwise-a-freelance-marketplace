const Login = () => {
    const [ShowPassword, SetShowPassword] = useState(false);
    const { signInUser, googleSignIn, gitHubSignIn } = useContext(AuthContext);
    const Navigate = useNavigate();
    const location = useLocation();
  
    const handleLogin = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      signInUser(email, password)
        .then(() => {
          Swal.fire({
            title: "Sucessfully signed in",
            icon: "success",
          });
          e.target.reset("");
          Navigate("/");
          Navigate(location?.state ? location.state : "/");
        })
        .catch(() => {
          Swal.fire({
            title: "Your email and password are incorrect",
            icon: "error",
          });
        });
    };
  
    const handleWithGoogleLoginIn = () => {
      googleSignIn()
        .then(() => {
          Swal.fire({
            title: "Sucessfully signed in",
            icon: "success",
          });
          Navigate("/");
          Navigate(location?.state ? location.state : "/");
        })
        .catch(() => {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
          });
        });
    };
  
  
   const handleWithGitHubLoginIn = () => {
    gitHubSignIn()
    .then(() => {
          Swal.fire({
            title: "Sucessfully signed in",
            icon: "success",
          });
          Navigate("/");
          Navigate(location?.state ? location.state : "/");
        })
        .catch(() => {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
          });
        });
   }
  
  
  
    return (
      <div>
        <div className="font-[sans-serif]  text-[#333]">
          <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
              <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="mb-10">
                    <h3 className="text-3xl font-extrabold">Sign in</h3>
                    <p className="text-sm mt-4">
                      Sign in to your account and explore a world of
                      possibilities. Your journey begins here.
                    </p>
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
                        placeholder="Current-password"
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
                      className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Log in
                    </button>
                  </div>
                  <p className="text-sm !mt-10 text-center">
                    Don&apos;t have an account{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap cursor-pointer font-bold"
                    >
                      Register here
                    </Link>
                  </p>
                  <div className="!mt-10 space-x-8 flex justify-center">
                    <button
                      onClick={handleWithGoogleLoginIn}
                      type="button"
                      className="border-none outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        className="inline"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#fbbd00"
                          d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                          data-original="#fbbd00"
                        />
                        <path
                          fill="#0f9d58"
                          d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                          data-original="#0f9d58"
                        />
                        <path
                          fill="#31aa52"
                          d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                          data-original="#31aa52"
                        />
                        <path
                          fill="#3c79e6"
                          d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                          data-original="#3c79e6"
                        />
                        <path
                          fill="#cf2d48"
                          d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                          data-original="#cf2d48"
                        />
                        <path
                          fill="#eb4132"
                          d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                          data-original="#eb4132"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleWithGitHubLoginIn}
                      type="button"
                      className="border-none outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35px"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                      </svg>
                    </button>
                  </div>
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
  
  export default Login;
  import { FaRegEye } from "react-icons/fa6";
  import { FaRegEyeSlash } from "react-icons/fa6";
  import { useContext, useState } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
