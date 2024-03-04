import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar.js";

import RecordList from "./components/recordList.js";
import Edit from "./components/edit.js";
import Create from "./components/create.js";

// import RecordList from "./components/recordList.js";
// import Edit from "./components/edit.js";
// import Create from "./components/create.js";

import LogInScreen from "./components/pages/loginScreen.js";
import HomeScreen from "./components/pages/home.js";
import ChatPage from "./components/pages/chatPage.js";
import ProgressPage from "./components/pages/progressPage.js";
import ProfilePage from "./components/pages/profilePage.js";

import CreateAccountPage from "./components/pages/createAccountPage.js";
import ForgotPassPage from "./components/pages/forgotPassPage.js";


const App = () => {
 return (
   <div>
     {/* <Navbar /> */}
     <Routes>
      {/* What mongoDB gave us for reference */}
       {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />

 

       <Route path="/create" element={<Create />} /> */}
       <Route exact path="/" element={<LogInScreen />} />

       <Route path="/login" element={<LogInScreen />}/>
       <Route path="/chat/:id" element={<ChatPage />}/>
       <Route path="/progress/:id" element={<ProgressPage />}/>
       <Route path="/profile/:id" element={<ProfilePage />}/>
       <Route path="/home/:id" element={<HomeScreen />}/>


       <Route path="/createAccount" element={<CreateAccountPage />}/>
       <Route path="/forgotPassword" element={<ForgotPassPage />}/>

     </Routes>
   </div>
 );
};
 export default App;