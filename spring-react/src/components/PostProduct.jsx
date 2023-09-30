import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PostProduct = () => {
  const [message, setMessage] = useState('');
  const productIdRef = useRef(null);
  const productNameRef = useRef(null);
  const productTypeRef = useRef(null);
  const productCategoryRef = useRef(null);
  const productPriceRef = useRef(null);

  const handlePostProduct = async () => {
    try {
      const newProduct = {
        productId: productIdRef.current.value,
        productName: productNameRef.current.value,
        productType: productTypeRef.current.value,
        productCategory: productCategoryRef.current.value,
        productPrice: productPriceRef.current.value,
      };

      const response = await axios.post('http://localhost:8888/save', newProduct);
      setMessage(response.data);
    } 
    catch (error) {
      console.error('Error posting product:', error);
      if (error.message === 'Network Error') {
        setMessage('Data not inserted Network Error. Please Try Again Later.');
      } else {
        setMessage('Product Data Insertion Failed. Please provide correct type of data.');
      }
    }
  };

  const headingStyle = {
    color: 'lightgreen',
  };

  const buttonStyle = {
    backgroundColor: 'lightgreen',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const successMessageStyle = {
    backgroundColor: 'lightgreen',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const errorMessageStyle = {
    backgroundColor: '#FFC0CB',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={{ background: '#E0FFFF   ', padding: '20px', borderRadius: '10px' }}>
      <strong><i><h3 style={headingStyle}>Post Product Data</h3></i></strong>
      <div style={{ width: '500px' }}>
        <strong><i><h2 style={headingStyle}>Post A Product</h2></i></strong>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product ID</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="text" ref={productIdRef} placeholder="new Product ID" />
              </td>
            </tr>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Name</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="text" ref={productNameRef} placeholder="new Product Name" />
              </td>
            </tr>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Type</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="text" ref={productTypeRef} placeholder="new Product Type" />
              </td>
            </tr>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Category</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <select ref={productCategoryRef}>
                  <option value="Electronics">Electronics</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Price</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="number" ref={productPriceRef} placeholder="new Product Price" />
              </td>
            </tr>        </tbody>
        </table><br></br>
        <button onClick={handlePostProduct} style={buttonStyle}>
          Post Product
        </button>
        {message && (
          <div style={message.startsWith('Product Data Insertion Failed') || message.startsWith('Data not inserted Network Error.') ? errorMessageStyle : successMessageStyle}>
            {message.startsWith('Data not inserted Network Error.') || message.startsWith('Product Data Insertion Failed') ? (
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginRight: '10px' }} />
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '10px' }} />
            )}
            <span style={{ color: message.startsWith('Product Data Insertion Failed') } || { color: message.startsWith('Data not inserted Network Error.') ? 'red' : 'lightgreen' }}>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostProduct;