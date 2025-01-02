import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess } from '../Util';

const home = () => {
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState(" ")
  useEffect(() => {
  setLoggedInUser ( localStorage.getItem("loggedInUser"))
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("token")
    handleSuccess("Logout Successfully")
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="w-full max-w-md p-8 mx-auto border border-gray-300 rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl"> Welcome... {loggedInUser} 😍</h2>
        </div>
        <button
          onClick={handleLogout}
          type="submit"
          className="w-full px-4 py-3 text-sm font-semibold tracking-wider text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Log Out
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default home