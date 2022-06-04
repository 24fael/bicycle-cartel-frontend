import React, {useState, useEffect} from "react";
import {Table, Button} from "react-bootstrap"
import AddProduct from "./AddProduct";
import ArchiveProductButton from "./ArchiveProductButton";
import EditProductButton from "./EditProductButton";

export default function AdminDashboard(props){
    const [products, setProducts] = useState([])


    const updateProduct = (product_id) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product_id}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
               
            })
        })
    }

    useEffect(() => {
        const product_array = props.products.map(product => {
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.is_active ? 'text-success': 'text-danger'}>{product.is_active ? 'In Stock': 'Out of Stock'}</td>
                    <td className="d-flex">
                        <EditProductButton product={product} refreshData={props.refreshData}/>
                        <span className="p-1"></span>
                        <ArchiveProductButton productId={product._id} isActive={product.is_active} refreshData={props.refreshData}/>
                    </td>
                </tr>
            )
        })

        setProducts(product_array)
    }, [props.products])

    return(
        <div>
            <div className="text-center my-4">
                <h1>Admin Dashboard</h1>
                <AddProduct refreshData={props.refreshData}/>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </div>
    )
}