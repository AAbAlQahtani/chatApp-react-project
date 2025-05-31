import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const url = "https://6837ad992c55e01d184a8113.mockapi.io/accounts"

  const LoginBtn = () => {
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all fields",
      })
      return
    }

    axios.get(url)
      .then((res) => {
        const user = res.data.find((u) => u.email === email && u.password === password )

        if (user) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1200,
          })

          localStorage.setItem("user", JSON.stringify(user))
          setTimeout(() => navigate("/"), 1300)

        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid credentials",
            text: "Email or password is incorrect",
          })
        }
      })

      .catch((err) => {
        console.error("Login error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
       
        <h1 className="text-3xl font-bold text-green-600 mb-2">Chat Login</h1>
        <p className="text-gray-500 mb-6">Welcome back to the chat</p>

        <label className="block text-left text-base text-gray-700 font-semibold mb-1">Email</label>
        <input type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded
           focus:outline-none focus:ring-2 focus:ring-green-400"/>


        <label className="block text-left text-base text-gray-700 font-semibold mb-1">Password</label>
       
        <input type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none
           focus:ring-2 focus:ring-green-400"/>

        <button
          onClick={LoginBtn}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition 
          cursor-pointer">
          Login
        </button>


        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:underline">
            Register </Link>
        </p>
      </div>
    </div>
  )
}
