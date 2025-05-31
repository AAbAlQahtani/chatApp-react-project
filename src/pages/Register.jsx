import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const url = "https://6837ad992c55e01d184a8113.mockapi.io/accounts"

    const RegisterBtn = () => {
        if ([name, email, password, confirmPassword].some((f) => !f)) {
            Swal.fire({
                icon: "warning",
                title: "Missing fields",
                text: "Please fill in all required fields: name, email, password, and confirm password.",
            })
            return
        }

        if (!email.includes("@") || !email.includes(".")) {
            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Enter a valid email address",
            })
            return
        }

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 6 characters",
            })
            return
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Passwords do not match",
            })
            return
        }

        axios.get(url).then((res) => {
            const existing = res.data.find((u) => u.email === email);
            if (existing) {
                Swal.fire({
                    icon: "error",
                    title: "Email Taken",
                    text: "This email is already in use",
                })
                return
            }

            axios.post(url, {
                name,
                email,
                password,
                image: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                bgImage: "https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png"
            })
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Account created",
                        showConfirmButton: false,
                        timer: 1200,
                    })
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setTimeout(() => navigate("/"), 1300);
                });
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-2">Register</h1>
                <p className="text-gray-500 mb-6">Create your chat account</p>

                <label className="block text-left text-base text-gray-700 font-semibold mb-1">Full Name</label>
                <input type="text" placeholder="Enter your name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none
                     focus:ring-2 focus:ring-green-400"/>

                <label className="block text-left text-base text-gray-700 font-semibold mb-1">Email</label>
                <input type="email" placeholder="example@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none 
                    focus:ring-2 focus:ring-green-400" />

                <label className="block text-left text-base text-gray-700 font-semibold mb-1">Password</label>
                <input type="password" placeholder="Create a password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none
                     focus:ring-2 focus:ring-green-400"/>

                <label className="block text-left text-base text-gray-700 font-semibold mb-1">Confirm Password</label>
                <input type="password" placeholder="Confirm your password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-5 border border-gray-300 rounded focus:outline-none
                     focus:ring-2 focus:ring-green-400"/>

                <button onClick={RegisterBtn}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded 
                    transition cursor-pointer" >
                    Register</button>

                <p className="text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">
                        Login</Link>
                </p>


            </div>
        </div>
    )
}
