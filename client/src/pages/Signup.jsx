import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../Util";
import axios from "axios";

const signup = () => {
  const navigate = useNavigate()
  const [signInfo, setSignInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const copySignInfo = { ...signInfo };
    copySignInfo[name] = value;
    setSignInfo(copySignInfo);
  };
 
  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password } = signInfo
      if (!name || !email || !password) {
        return handleError("(Name & Email & Password) Fields Are Required");
      }
    if (!name) {
      return handleError("Name Field Are Required");
    }
    if (!email) {
      return handleError("Email Field Are Required");
    }
    if (!password) {
      return handleError("Password Field Are Required");
    }
  

    try {
        const url = "http://localhost:3000/auth/registration";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(signInfo),
  
        
      })
      console.log(response)
      const result = await response.json()
      const { success, message,error } = result
      if (success) {
        handleSuccess(message || "Signup successful")
        
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
     
      
    } catch (error) {
      handleError(error)
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="w-full max-w-md p-8 mx-auto border border-gray-300 rounded-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl">Sign Up</h2>
          </div>
          <form onSubmit={handleSignup}>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-gray-800">Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  value={signInfo.name}
                  className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="text"
                  value={signInfo.email}
                  className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-800">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={signInfo.password}
                  className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="!mt-12">
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm font-semibold tracking-wider text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="mt-6 text-sm text-center text-gray-800">
              Already have an account ?
              <Link className="hover:text-red-500" to={"/login"}>
                Login Here
              </Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default signup;
