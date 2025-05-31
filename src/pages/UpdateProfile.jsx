import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function UpdateProfile() {
    const { id } = useParams()
    const navigate = useNavigate()
    const url = "https://6837ad992c55e01d184a8113.mockapi.io/accounts"

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [bgImage, setBgImage] = useState("")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) {
            navigate("/login")
        }
    }, [navigate])

    useEffect(() => {
        axios.get(`${url}/${id}`)
            .then((res) => {
                setName(res.data.name)
                setImage(res.data.image)
                setBgImage(res.data.bgImage || "")
            })
            .catch((err) => {
                console.error("Failed to fetch user:", err)
            })
    }, [id])

    const update = () => {
        if (!name.trim() || !image.startsWith("http") || !bgImage.startsWith("http")) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter valid name, image URL, and background image URL",
            })
            return
        }

        axios
            .put(`${url}/${id}`, { name, image, bgImage })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    showConfirmButton: false,
                    timer: 1200,
                })
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate("/profile")
            })
            .catch((err) => {
                console.error("Update failed:", err)
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update",
                })
            });
    };

    return (
        <div className="flex items-center min-h-screen bg-green-100 justify-center p-4">
            <div className="max-w-xs w-full bg-white shadow-xl rounded-lg py-4 px-6 text-center">
                <img src={image}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 mb-4"
                    alt="User" />

                <div className="text-left mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name</label>

                    <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="Your name" />
                </div>

                <div className="text-left mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image URL</label>
                    <input type="text" value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="https://example.com" />
                </div>

                <div className="text-left mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chat Background Image URL </label>

                    <input type="text" value={bgImage}
                        onChange={(e) => setBgImage(e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="https://example.com" />
                </div>

                <button onClick={update}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700
                     text-sm mb-2 cursor-pointer">
                    Save Changes</button>

                <Link to="/profile"
                    className="block text-sm text-green-600 hover:underline cursor-pointer" >
                    Cancel </Link>
            </div>
        </div>
    )
}
