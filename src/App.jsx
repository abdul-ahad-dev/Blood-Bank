
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./screen/NotFound";
import Loading from "./screen/Loading";
import Home from "./screen/Home";
import Chat from "./screen/Chat";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import ChatList from "./screen/Chatlist";
import BloodDonate from "./screen/BloodDonate";

export default function App() {
    const router = createBrowserRouter([
        { path: "*", element: <NotFound />, },
        { path: "/", element: <Loading />, },
        { path: "/home", element: <Home />, },
        { path: "/chat", element: <Chat />, },
        { path: "/login", element: <Login />, },
        { path: "/signup", element: <Signup />, },
        { path: "/donateblood", element: <BloodDonate />, },
        { path: "/chatlist", element: <ChatList />, },
        { path: "/location", element: <Location />, },
    ]);

    return <RouterProvider router={router} />
}