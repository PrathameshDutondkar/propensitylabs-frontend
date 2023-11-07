import React from "react";
import { Table, Button } from "antd";

function Cart({ cart, onRemoveItem }) {
  const columns = [
    {
      title: "Image",
      dataIndex: "Image Src",
      key: "Image Src",
      render: (src) => (
        <img src={src} alt="Product" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "SKU",
      dataIndex: "Variant SKU",
      key: "Variant SKU",
    },
    {
      title: "Price",
      dataIndex: "Variant Price",
      key: "Variant Price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => onRemoveItem(record)}
          type="danger"
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Table columns={columns} dataSource={cart} />
    </div>
  );
}

export default Cart;
