import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const LogoutBtn = () => {
    localStorage.removeItem("user")
    navigate("/login")
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm w-full">
        <img src={user.image} alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-400"/>
       
        <h2 className="text-2xl font-bold text-green-600 mb-1">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>


        <button onClick={() => navigate(`/updateprofile/${user.id}`)}
          className="mb-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded cursor-pointer">
          Edit Profile</button>

        <button onClick={LogoutBtn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded cursor-pointer">
          Log out</button>


      </div>
    </div>
  );
}
