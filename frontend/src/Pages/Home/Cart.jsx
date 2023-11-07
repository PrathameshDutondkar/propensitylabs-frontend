import React from "react";
import { Table, Button,Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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
      title: "Remove from Cart",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => onRemoveItem(record)}
          type="danger"
          icon={<DeleteOutlined />} 
        />
      ),
    },
  ];

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <Table columns={columns} dataSource={cart} />
      ) : (
        <Empty description="No items in the cart" />
      )}
    </div>
  );
}

export default Cart;
