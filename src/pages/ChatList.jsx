import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

   useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    if (!currentUser) return
    axios.get("https://6837ad992c55e01d184a8113.mockapi.io/accounts")
      .then((res) => {
        const others = res.data.filter((u) => u.id !== currentUser.id);
        setUsers(others)
      });
  }, [currentUser])

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h2 className="text-2xl text-green-700 font-bold mb-6 text-center"> Select user to chat with</h2>
      
      <div className="grid gap-4 max-w-md mx-auto">
        {users.map((user) => (
          <div key={user.id} onClick={() => navigate(`/chat/${user.id}`)}
            className="bg-white p-4 rounded-lg shadow hover:bg-green-50 cursor-pointer flex 
            items-center gap-4"  >
            
            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full" />
            
            <div>
              <p className="text-lg font-semibold text-green-700">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
