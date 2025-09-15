import React, { useState } from "react";
import Inventory from "./components/InventoryPage/Inventory";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import LogSignPage from "./components/LogSignPage/LogSignPage";
import { Route, Routes,  } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inventory />}/>
        <Route path="/auth" element={<LogSignPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
