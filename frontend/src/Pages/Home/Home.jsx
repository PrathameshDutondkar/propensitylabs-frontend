  import React, { useEffect, useState } from "react";
  import { Table, Input, Button, Space, Spin, Empty } from "antd";
  import { Link } from "react-router-dom";
  import { ShoppingCartOutlined } from "@ant-design/icons";
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 

  function Home({ cart, setCart }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
    
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
        title: "Add to Cart",
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
        autoClose: 2000,
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
        <h2>Products</h2>
        <Input
          placeholder="Search SKU or Title"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "50vw", marginBottom: "2rem" ,marginRight:"1rem" }}
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
      </div>
    );
  }

  export default Home;
