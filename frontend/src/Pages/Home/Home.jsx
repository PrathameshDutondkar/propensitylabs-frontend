import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, InputNumber, Input, Spin, message } from 'antd';
import axios from 'axios';

const fallbackImageSrc = 'your-fallback-image-url';
const apiUrl = 'http://localhost:8080/add-user';

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
  },
  {
    title: 'Price',
    dataIndex: 'Variant Price',
    key: 'Variant Price',
  },
  {
    title: 'SKU',
    dataIndex: 'Variant SKU',
    key: 'Variant SKU',
  },
  {
    title: 'Vendor',
    dataIndex: 'Vendor',
    key: 'Vendor',
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: '_id',
    render: (id) => (
      <AddToCartButton itemId={id} />
    ),
  },
];

const AddToCartButton = ({ itemId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    axios.post(apiUrl, { itemId, quantity })
      .then((response) => {
        setLoading(false);
        message.success('Item added to the cart successfully.');
      })
      .catch((error) => {
        setLoading(false);
        message.error('Failed to add item to the cart.');
      });

    setModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add to Cart
      </Button>
      <Modal
        title="Add to Cart"
        visible={modalVisible}
        onOk={handleAddToCart}
        onCancel={() => setModalVisible(false)}
      >
        <p>Item ID: {itemId}</p>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value)}
        />
        {loading && <Spin />}
      </Modal>
    </>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setLoading(false);
        message.error('Failed to fetch data.');
      });
  }, []);

  const filteredData = data.filter((item) =>
    item['Variant SKU']?.includes(searchText) || item['Title']?.toLowerCase()?.includes(searchText?.toLowerCase())
  );

  return (
    <div>
      <h1>Order Page</h1>
      <Input
        placeholder="Search by SKU or Title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{width:"60vw"}}
      />
      {loading ? (
        <Spin size="large" />
      ) : filteredData.length > 0 ? (
        <Table dataSource={filteredData} columns={columns} rowKey="_id" />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Home;
