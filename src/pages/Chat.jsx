import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function Chat() {
    const { id: otherUserId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [otherUser, setOtherUser] = useState(null);
    const messagesEndRef = useRef(null);
    const apiUrl = "https://6837ad992c55e01d184a8113.mockapi.io/messages";
    const accountsUrl = "https://6837ad992c55e01d184a8113.mockapi.io/accounts";
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])

    useEffect(() => {
        axios.get(`${accountsUrl}/${otherUserId}`).then((res) => {
            setOtherUser(res.data)
        })
    }, [otherUserId])

    useEffect(() => {
        if (!currentUser) return
        const fetchMessages = () => {
            axios.get(apiUrl).then((res) => {
                const filtered = res.data.filter(
                    (msg) =>
                        (msg.senderId === currentUser.id && msg.receiverId === otherUserId) ||
                        (msg.senderId === otherUserId && msg.receiverId === currentUser.id)
                )
                setMessages(filtered)
            })
        }


        fetchMessages()
        const interval = setInterval(fetchMessages, 2000)
        return () => clearInterval(interval)
    }, [currentUser, otherUserId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = () => {
        if (!text.trim()) return

        const newMsg = {
            senderId: currentUser.id,
            receiverId: otherUserId,
            text,
            time: new Date().toISOString()
        }

        axios.post(apiUrl, newMsg).then(() => {
            setText("")
        })
    }

    return (
        <div
            className="flex flex-col h-[calc(100vh-64px)]"
            style={{
                backgroundImage: `url(${currentUser?.bgImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-white/80 backdrop-blur px-4 pt-5 pb-3 shadow text-green-600 font-bold flex 
      items-center gap-3 sticky top-0 z-10">

                <button onClick={() => navigate("/")}
                    className="text-2xl hover:text-green-800 cursor-pointer" >
                    <HiArrowLeft />
                </button>

                <span className="text-xl truncate">
                    {otherUser ? otherUser.name : "Loading..."}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {messages.map((msg) => (
                    <div key={msg.id}
                        className={`max-w-xs p-3 rounded-2xl text-sm shadow whitespace-pre-wrap break-words ${msg.senderId === currentUser.id
                            ? "ml-auto bg-green-500 text-white"
                            : "mr-auto bg-gray-200 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white flex gap-2 sticky bottom-0 shadow">
                <input
                    type="text" value={text} placeholder="Type your message..."
                    className="flex-1 p-3 border-2 border-green-500 rounded-xl focus:outline-none focus:ring-2
                     focus:ring-green-500"
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 cursor-pointer">
                    Send </button>

            </div>
        </div>
    )
}
