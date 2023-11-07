import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home/Home";
import Cart from "./Pages/Home/Cart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]); // Initialize cart state

  return (
    <div className="App" data-testid="app-component">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        <Route path="/" element={<Home setCart={setCart} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
