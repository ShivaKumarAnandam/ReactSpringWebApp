import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const DeleteProduct = () => {
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const productIdRef = useRef(null);

  const handleFetchProductDetails = async () => {
    try {
      const productId = productIdRef.current.value;
      const response = await axios.get(`http://localhost:8888/getOne/${productId}`);

      if (response.data) {
        setProduct(response.data);
        setMessage('');
      } else {
        setProduct(null);
        setMessage('Product not found for the provided ID.');
      }
    }
    catch (error) {
      console.error('Error fetching product:', error);
      if (error.message === 'Network Error') {
        setMessage('Product Data fetching Failed - Network Error. Please Try Again Later.');
      } else {
        setMessage('Product data not fetched . Please provide correct data.');
      }
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8888/delete/${productIdRef.current.value}`);
      setMessage('Product deleted successfully');
      setProduct(null);
    }
    catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Product data not deleted . Please check connection.');
    }
  };

  const buttonStyle = {
    backgroundColor: 'lightcoral',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const headingStyle = {
    color: 'red',
  };

  return (
    <div style={{ background: '#FFDAB9', padding: '20px', borderRadius: '10px' }}>
      <strong><i><h3 style={headingStyle}>Get And Delete A Product</h3></i></strong>
      <div style={{ width: '500px' }}>
        <strong><i><h2 style={headingStyle}>Delete Product</h2></i></strong>
        <ul>
          <li style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
            <input type="number" ref={productIdRef} placeholder="Give Product ID" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handleFetchProductDetails} style={{ marginBottom: '10px' }}>
              Fetch Product Data
            </button>
          </li>
        </ul>

        {product && (
          <div>
            <h3>Product Details</h3>
            <p><strong>Product Name:</strong> {product.productName}</p>
            <p><strong>Product Type:</strong> {product.productType}</p>
            <p><strong>Product Category:</strong> {product.productCategory}</p>
            <p><strong>Product Price:</strong> {product.productPrice}</p>
            <button onClick={handleDeleteProduct} style={buttonStyle}>Delete Product</button>
          </div>
        )}

        {message && <div style={{ marginTop: '10px', color: message === 'Product deleted successfully' ? 'green' : 'red' }}>
          <FontAwesomeIcon icon={message === 'Product deleted successfully' ? faCheckCircle : faTimesCircle} />
          &nbsp;&nbsp;{message}
        </div>}
      </div>
    </div>
  );
};

export default DeleteProduct;