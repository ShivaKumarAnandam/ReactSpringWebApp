import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const GetProductForUpdateDelete = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const productIdRef = useRef(null);

  const handleFetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/getOne/${productIdRef.current.value}`);
      setProduct(response.data);
      setError(false);
      setMessage('Product Details Fetched Successfully');
    }
    catch (error) {
      console.error('Error fetching product:', error);
      setError(true);
      setProduct(null);
      if (error.message === 'Network Error') {
        setMessage('Product Details Not Fetched -Network Error. Please Try Again.');
      } else {
        setMessage('Product Details Not Fetched. Please provide correct ID.');
      }
    }
  };

  const headingStyle = {
    color: 'lightgreen',
  };

  return (
    <div>
      <div style={{ background: '#FAFAD2', padding: '20px', borderRadius: '10px' }}>
        <strong><i><h3 style={headingStyle}>Get A Product</h3></i></strong>
        <strong><i><h2 style={headingStyle}>Fetch Product</h2></i></strong>
        <input type="number" ref={productIdRef} placeholder="Product ID" /><br /><br />
        <button onClick={handleFetchProduct}>Fetch Product</button>

        {message && (
          <div style={{ color: error ? 'red' : 'green' }}>
            <br /><br />
            <FontAwesomeIcon icon={error ? faTimesCircle : faCheckCircle} /> {message}
          </div>
        )}

        {product && (
          <div>
            <h1>Product Details</h1>
            <table border="1" cellSpacing={2} cellPadding={5}>
              <thead>
                <tr>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product ID</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Name</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Type</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Category</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Discount</th>
                  <th rowSpan={1} colSpan={2} style={{ textAlign: 'center' }}>Charges</th>
                  <th rowSpan={2} colSpan={2} style={{ fontWeight: 'bold', textAlign: 'center' }}>Product Final Price</th>
                </tr>
                <tr>
                  <th rowSpan={1} colSpan={1}>gstCharges</th>
                  <th rowSpan={1} colSpan={1}>deliveryCharges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productType}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.discount}</td>
                  <td>{product.charges.gst}</td>
                  <td>{product.charges.deliveryCharges}</td>
                  <td colSpan="2" rowSpan="2" style={{ fontWeight: 'bold' }}>{product.finalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProductForUpdateDelete;