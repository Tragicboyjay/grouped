import { createBrowserRouter} from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ChatGroup from "../pages/ChatGroup";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />

    },
    {
        path: "/sign_in",
        element: <SignIn />
    },
    {
        path: "/sign_up",
        element: <SignUp />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/chat/:groupId",
        element: <ChatGroup />
    },
    {
        path: "*",
        element: <NotFound />
    }
])
 
export default Router;