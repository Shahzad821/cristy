import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useStoreContext } from "../context/Store";

import toast from "react-hot-toast";

const LoginPopUp = ({ setShowSignup }) => {
  const { setToken } = useStoreContext();
  const url = "http://localhost:5000";
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    let newUrl = currState === "Login" ? "/login" : "/signup";
    const apiUrl = `${url}/api/user${newUrl}`;

    try {
      const response = await axios.post(apiUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowSignup(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setData({ name: "", email: "", password: "" });
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <form
        onSubmit={onLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full  max-w-sm relative"
      >
        <RxCross2
          className="absolute right-5 top-2 text-2xl cursor-pointer hover:scale-[1.1] transition-all ease-in"
          onClick={() => setShowSignup(false)}
        />
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold">{currState}</h2>
        </div>

        <div className="space-y-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              className="border rounded-md p-2 w-full focus:outline-none"
              aria-label="Your Name"
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            className="border rounded-md p-2 w-full focus:outline-none"
            aria-label="Your Email"
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            className="border rounded-md p-2 w-full focus:outline-none"
            aria-label="Your Password"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 rounded-md w-full mt-4 hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : currState === "Sign Up"
            ? "Create account"
            : "Log In"}
        </button>
        <div className="flex items-center mt-4">
          <input type="checkbox" required className="mr-2" />
          <p className="text-sm">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p className="mt-4 text-sm">
            Create a new account?
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-blue-500 cursor-pointer"
            >
              {" "}
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm">
            Already have an account?
            <span
              onClick={() => setCurrState("Login")}
              className="text-blue-500 cursor-pointer"
            >
              {" "}
              Log In
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
