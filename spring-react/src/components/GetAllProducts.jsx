import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [fetchMessage, setFetchMessage] = useState('');
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const handleFetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8888/getAll');
      setProducts(response.data);
      setFetchSuccess(true);
      setFetchMessage('Data Fetched Successfully');
    }
    catch (error) {
      console.error('Error fetching products:', error);
      setFetchSuccess(false);
      setFetchMessage('Fetching Failed - Network Issue. Please Try Again Later');
    }
  };

  const headingStyle = {
    color: 'lightgreen',
  };

  return (
    <div style={{ background: '#FFF0F5   ', padding: '20px', borderRadius: '10px' }}>
      <strong><i><h3 style={headingStyle}>View All Products</h3></i></strong>
      <div>
        <strong><i><h2 style={headingStyle}>Fetch All</h2></i></strong>
        <button onClick={handleFetchProducts}>Fetch Products</button>

        {fetchMessage && (
          <div style={{ marginTop: '10px', color: fetchSuccess ? 'green' : 'red' }}>
            <FontAwesomeIcon icon={fetchSuccess ? faCheckCircle : faTimesCircle} /> {fetchMessage}
          </div>
        )}

        {fetchSuccess && products.length > 0 && (
          <div>
            <h3>Product Details</h3>
            <table border="1" cellSpacing={2} cellPadding={5}>
              <thead>
                <tr>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Details</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product ID</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Name</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Type</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Product Category</th>
                  <th rowSpan={2} colSpan={1} style={{ textAlign: 'center' }}>Discount</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Charges</th>
                  <th rowSpan={2} colSpan={2} style={{ fontWeight: 'bold', textAlign: 'center' }}>Product Final Price</th>
                </tr>
                <tr>
                  <th rowSpan={1} colSpan={1} style={{ textAlign: 'center' }}>GST Charges</th>
                  <th rowSpan={1} colSpan={1} style={{ textAlign: 'center' }}>Delivery Charges</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productType}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.discount}</td>
                    <td>{product.charges.gst}</td>
                    <td>{product.charges.deliveryCharges}</td>
                    <td>{product.finalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllProducts;