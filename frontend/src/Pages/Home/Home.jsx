import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";


function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Make a GET request to your API endpoint (http://localhost:8080/users)
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  return (
    <div>
      <h2>Product Table</h2>
      <Input
        placeholder="Search SKU or Title"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{width:"50vw",marginBottom:"2rem"}}
      />
      <Table dataSource={filteredData} columns={columns} />
    </div>
  );
}

export default Home;
