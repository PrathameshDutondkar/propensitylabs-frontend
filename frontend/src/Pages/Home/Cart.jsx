import React from "react";

function Cart({ cart }) { // Change the parameter name to 'cart' (matching the state name)
  console.log("xxxxxxxxx",cart[0],)
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => ( // Use 'cart' instead of 'Cart' and remove the optional chaining
          <li key={index}>{item}</li> // Use correct property name
        ))}
      </ul>
    </div>
  );
}

export default Cart;
