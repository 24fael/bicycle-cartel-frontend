import React from 'react'
import {Table} from 'react-bootstrap'

export default function CartTable(props){
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.cartItems }
                <tr>
                    <td colSpan={3}></td>
                    <td className="text-center"><strong>Total Amount</strong></td>
                    <td><strong>₱{props.totalAmount}</strong></td>
                    <td></td>
                </tr>
            </tbody>
            </Table>
    )
}