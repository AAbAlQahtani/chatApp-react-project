import React from 'react'


import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import ChatList from '../pages/ChatList';
import UpdateProfile from '../pages/UpdateProfile';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Layout() {
    return (

        <>
        <Nav/>
            <Outlet />
            <Footer/>

        </>

    );

}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element: <Profile /> },
                        { path: "/updateprofile/:id", element: <UpdateProfile /> },

                        { path: "/", element: <ChatList /> },
                        { path: "/chat/:id",element: <Chat />,
}





        ],
    },
]);


export default function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

