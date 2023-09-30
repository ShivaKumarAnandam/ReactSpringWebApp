import React from 'react';
import { Link, Routes, Route } from "react-router-dom"
import GetAllProducts from './GetAllProducts.jsx';
import GetProductForUpdateDelete from './GetProductForUpdateDelete.jsx';
import PostProduct from './PostProduct.jsx';
import UpdateProduct from './UpdateProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';

const Master = () => {

    return (
        <>
                <i><u><h1 style={{ color: '#20B2AA' }}>SINGLE PAGE APPLICATION</h1></u></i>

                <Link to="/" style={{ marginRight: 60 }}>
                    <i><b style={{ color: 'orange' }}>Home</b></i>
                </Link>

                <Link to="/getProduct" style={{ marginRight: 60 }}>
                    <i><b style={{ color: 'orange' }}>Get Product</b></i>
                </Link>

                <Link to="/postProduct" style={{ marginRight: 60 }}>
                    <i><b style={{ color: 'orange' }}>Post Product</b></i>
                </Link>

                <Link to="/updateProduct" style={{ marginRight: 60 }}>
                    <i><b style={{ color: 'orange' }}>Update Product</b></i>
                </Link>

                <Link to="/deleteProduct" style={{ marginRight: 60 }}>
                    <i><b style={{ color: 'orange' }}>Delete Product</b></i>
                </Link>
                <br></br><br></br>
                <Routes>
                    <Route path="/" element={<GetAllProducts></GetAllProducts>} />
                    <Route path="/getProduct" element={<GetProductForUpdateDelete></GetProductForUpdateDelete>} />
                    <Route path="/postProduct" element={<PostProduct></PostProduct>} />
                    <Route path="/updateProduct" element={<UpdateProduct></UpdateProduct>} />
                    <Route path="/deleteProduct" element={<DeleteProduct></DeleteProduct>} />
                </Routes>
        </>
    );
};

export default Master;