import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home/Home";
// import {Cart} from "./Pages/Home/Cart";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App" data-testid="app-component">
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Routes>
        <Route path="/" element={<Home></Home>} />
        {/* <Route path="/cart" element={<Cart></Cart>} /> */}
      </Routes>
    </div>
  );
}

export default App;
