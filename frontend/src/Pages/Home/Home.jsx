  import React, { useEffect, useState } from "react";
  import { Table, Input, Button, Space, Spin, Empty } from "antd";
  import { Link } from "react-router-dom";
  import { ShoppingCartOutlined } from "@ant-design/icons";
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Cart from "./Cart";

  function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
      // Make a GET request to your API endpoint (http://localhost:8080/users)
      fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setFilteredData(data);
          setLoading(false); // Data has been loaded
        })
        .catch((error) => {
          setError(error); // Handle errors
          setLoading(false); // Data loading failed
        });
    }, []);

    const columns = [
      {
        title: "Image",
        dataIndex: "Image Src",
        key: "Image Src",
        render: (src) => <img src={src} alt="Product" style={{ maxWidth: "100px" }} />,
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
            onClick={() => handleAddToCart(record)}
            type="primary"
            size="small"
          >
            Add to Cart
          </Button>
        ),
      },
    ];

    const handleSearch = (value) => {
      setSearchText(value);

      // Filter the data based on SKU and Title
      const filtered = data?.filter(
        (item) =>
          item["Variant SKU"]?.includes(value) ||
          item["Title"]?.toLowerCase()?.includes(value?.toLowerCase())
      );

      setFilteredData(filtered);
    };

    const handleAddToCart = (item) => {
      setCart([...cart, item]);
      toast.success(`Added "${item.Title}" to the cart`, {
        position: "top-right",
        autoClose: 2000, // Auto-close the message after 2 seconds (adjust as needed)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    if (loading) {
      return <Spin size="large" />;
    }

    if (error) {
      return <div>Error loading data: {error.message}</div>;
    }

    return (
      <div>
        <h2>Product Table</h2>
        <Input
          placeholder="Search SKU or Title"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "50vw", marginBottom: "2rem" }}
        />
        <Link to="/cart">
          <Button type="primary" style={{ marginTop: "1rem" }}>
            <Space>
              <ShoppingCartOutlined /> View Cart
            </Space>
          </Button>
        </Link>
        {filteredData.length > 0 ? (
          <Table dataSource={filteredData} columns={columns} />
        ) : (
          <Empty description="No data found" />
        )}

        <Cart cart={cart}></Cart>
      </div>
    );
  }

  export default Home;
