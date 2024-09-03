// import { Route, Routes } from "react-router-dom";
// import SignIn from "../pages/SignIn";
// import Home from "../pages/Home";
// import SignUp from "../pages/SignUp";
// import Profile from "../pages/Profile";
// import NotFound from "../pages/NotFound";
// import GroupsList from "../pages/GroupsList.txt"; // Import GroupsList
// import Groups from "../pages/Groups"; // Import Groups
// import About from "../pages/About"; // Import About page
// import Contact from "../pages/Contact"; // Import Contact page
//
// const Router = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/sign_in" element={<SignIn />} />
//             <Route path="/sign_up" element={<SignUp />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/groups" element={<GroupsList />} /> {/* Groups list */}
//             <Route path="/groups/:groupId" element={<Groups />} /> {/* Specific group chat */}
//             <Route path="/about" element={<About />} /> {/* About page */}
//             <Route path="/contact" element={<Contact />} /> {/* Contact page */}
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// };
//
// export default Router;
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import Groups from "../pages/Groups";
import About from "../pages/About"; // Add About page
import Contact from "../pages/Contact"; // Add Contact page

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
        </Routes>
    );
}

export default Router;