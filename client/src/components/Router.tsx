import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ChatGroup from "../pages/ChatGroup";

const Router = () => {
    return (  
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat/:groupId" element={<ChatGroup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
 
export default Router;