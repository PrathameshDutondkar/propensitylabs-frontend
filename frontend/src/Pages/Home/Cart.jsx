import React from "react";

function Cart({ Cart }) {
    console.log(Cart,"********88888")
   
    Cart?.forEach(item => {
        const handle = item.Handle;
        console.log(`Handle: ${handle}`);
      });

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {Cart?.map((item, index) => (
          <li key={index}>{item?.Handle}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
