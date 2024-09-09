
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import Groups from "../pages/Groups";
import About from "../pages/About";
import Contact from "../pages/Contact";

import BlogIndex from "../pages/BlogIndex";
import BlogCreate from "../pages/BlogCreate";
import BlogEdit from "../pages/BlogEdit";
import BlogDelete from "../pages/BlogDelete";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/about" element={<About />} /> {/* Add route for About page */}
            <Route path="/contact" element={<Contact />} /> {/* Add route for Contact page */}
            <Route path="*" element={<NotFound />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/create" element={<BlogCreate />} />
            {/* Dynamic routes for edit and delete */}
            <Route path="/blog/edit/:id" element={<BlogEdit />} />
            <Route path="/blog/delete/:id" element={<BlogDelete />} />
            {/*  the blog routes removed from React, as these should now be handled by ASP.NET Core MVC */}

        </Routes>
    );
}

export default Router;