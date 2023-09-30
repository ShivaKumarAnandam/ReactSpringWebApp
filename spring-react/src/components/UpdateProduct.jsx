import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const UpdateProduct = () => {
  const [message, setMessage] = useState('');
  const productIdRef = useRef(null);
  const updatedProductNameRef = useRef(null);
  const updatedProductTypeRef = useRef(null);
  const updatedProductCategoryRef = useRef(null);
  const updatedDiscountRef = useRef(null);
  const updatedProductPriceRef = useRef(null);
  const updatedGstRef = useRef(null);
  const updatedDeliveryChargesRef = useRef(null);
  const updatedFinalPriceRef = useRef(null);

  const handleFetchProductDetails = async () => {
    try {
      const productId = productIdRef.current.value;

      const response = await axios.get(`http://localhost:8888/getOne/${productId}`);

      if (response.data) {
        const existingProduct = response.data;
        updatedProductNameRef.current.value = existingProduct.productName;
        updatedProductTypeRef.current.value = existingProduct.productType;
        updatedProductCategoryRef.current.value = existingProduct.productCategory;
        updatedProductPriceRef.current.value = existingProduct.productPrice;
        updatedDiscountRef.current.value = existingProduct.discount;
        updatedGstRef.current.value = existingProduct.charges.gst;
        updatedDeliveryChargesRef.current.value = existingProduct.charges.deliveryCharges;
        updatedFinalPriceRef.current.value = existingProduct.finalPrice;
        setMessage('');
      }

    } 
    catch (error) {
      console.error('Error fetching product:', error);
      if (error.message === 'Network Error') {
        setMessage('Data Updation Failed - Network Error. Please Try Again Later.');
      } else {
        setMessage('Product not found for the ID provided ,Please provide correct ID');
      }
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const productId = productIdRef.current.value;

      const updatedProduct = {
        productName: updatedProductNameRef.current.value,
        productType: updatedProductTypeRef.current.value,
        productCategory: updatedProductCategoryRef.current.value,
        productPrice: parseFloat(updatedProductPriceRef.current.value),
        discount: 0.00,
        charges: {
          gst: 0.00,
          deliveryCharges: 0.00
        },
        finalPrice: 0.00
      };

      const response = await axios.put(`http://localhost:8888/update/${productId}`, updatedProduct);

      if (response.data === 'Product Data Updated Successfully...!') {
        setMessage(response.data);
      } else {
        setMessage('Product not found for the ID provided ,Please provide correct ID');
      }
    } 
    catch (error) {
      console.error('Error updating product:', error);
      setMessage('Product not found for the ID provided ,Please provide correct ID');
    }
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

  const headingStyle = {
    color: 'lightgreen',
  };

  return (
    <div style={{ background: '#E0FFFF             ' , padding: '20px' , borderRadius: '10px'}}>
      <h3 style={headingStyle}>Get and Update A Product</h3>
      <div style={{ width: '500px' }}>
        <strong><i><h2 style={headingStyle}>Update By Id</h2></i></strong>
        <ul>
          <li style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
            <input type="number" ref={productIdRef} placeholder="Give Product ID" onChange={(e) => handleFetchProductDetails(e.target.value)} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handleUpdateProduct} style={buttonStyle}>
              Update Product
            </button>
          </li>
        </ul>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Name</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="text" ref={updatedProductNameRef} placeholder="Product Name to be updated" />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Type</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="text" ref={updatedProductTypeRef} placeholder="Product Type to be updated" />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Product Category</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <select ref={updatedProductCategoryRef}>
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
                <input type="number" ref={updatedProductPriceRef} placeholder="Product Price to be updated" />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Discount</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="number" ref={updatedDiscountRef} placeholder="Product Discount-Immutable" readOnly />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Gst Charges</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="number" ref={updatedGstRef} placeholder="Product Gst-Immutable" readOnly />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Delivery Charges</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="number" ref={updatedDeliveryChargesRef} placeholder="Product Delivery Charges-Immutable" readOnly />
              </td>
            </tr>

            <tr>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <strong>Final Price</strong>
              </td>
              <td style={{ border: '0px solid black', textAlign: 'left', padding: '5px' }}>
                <input type="number" ref={updatedFinalPriceRef} placeholder="Product Final Price-Immutable" readOnly />
              </td>
            </tr>

          </tbody>
        </table>
        <br></br>

        {message && (
          <div style={{ marginTop: '10px', color: message === 'Product Data Updated Successfully...!' ? 'green' : 'red' }}>
            <FontAwesomeIcon icon={message === 'Product Data Updated Successfully...!' ? faCheckCircle : faTimesCircle} />
            &nbsp;&nbsp;{message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProduct;