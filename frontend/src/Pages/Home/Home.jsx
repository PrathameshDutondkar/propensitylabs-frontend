import React, { useEffect, useState } from 'react';
import { Table } from 'antd';


const fallbackImageSrc = "https://www.ncenet.com/no-image-found"; 

const columns = [
  {
    title: 'Image',
    dataIndex: 'Image Src',
    key: 'Image Src',
    render: (imageSrc) => (
      <img
        src={imageSrc || fallbackImageSrc}
        alt="Product"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
    render: (title) => title || 'No data available',
  },
  {
    title: 'Price',
    dataIndex: 'Variant Price',
    key: 'Variant Price',
    render: (price) => price || 'No data available',
  },
  {
    title: 'SKU',
    dataIndex: 'Variant SKU',
    key: 'Variant SKU',
    render: (sku) => sku || 'No data available',
  },
  {
    title: 'Vendor',
    dataIndex: 'Vendor',
    key: 'Vendor',
    render: (vendor) => vendor || 'No data available',
  },
];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace this URL with your API endpoint
    fetch('http://localhost:8080/users')
      .then((response) => response.json())
      .then((result) => {
        setData(result); // Assuming the API response is an array of items
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Order Page</h1>
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Home;
