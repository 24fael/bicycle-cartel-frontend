import React, {useState, useContext, useEffect} from 'react'
import UserContext  from "../contexts/UserContext";
import {Navigate} from 'react-router-dom'
import {Row, Col, Table} from 'react-bootstrap'
import moment from 'moment';

export default function Orders(){
    const {user, setUser} = useContext(UserContext)
    const [orders, setOrders] = useState([])
    // const [orderProducts, setOrderProducts] = useState([])

    useEffect(() => {
        if(user.isAdmin){
            fetch(`${process.env.REACT_APP_API_BASE_URL}/orders`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => response.json())
            .then(result => {
                if(result){
                    setOrders(result)
                }
            })
        }
        else{
            fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/auth`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => response.json())
            .then(result => {
                if(result){
                    setOrders(result)
                }
            })
        }
    }, [])

    const order_items = orders.map((item) => {
        return(
            <tr>
                {
                    user.isAdmin ? <td>{item.user_id}</td> : ''
                }
                <td>{item._id}</td>
                <td>{moment(item.purchased_on).format("LLL")}</td>
                <td>
                    <ul>
                    {
                        item.order_products.map(product => {
                            return (
                                <li><strong>{product.quantity}x</strong> {product.name} - ₱{product.price} each</li>
                            )
                        })
                    }
                    </ul>
                </td>
                <td>₱{item.total_amount}</td>
            </tr>
        )
    })

    return(
        (user.regularUser || user.isAdmin) ?   
            <Row className="mt-5">
                <Col>
                    <h1>
                        {user.isAdmin ? 'User Orders' : 'Your Orders'}
                    </h1>
                    <Table striped hover bordered> 
                        <thead>
                            <tr>
                                {
                                    user.isAdmin ? <th>User ID</th> : ''
                                }
                                <th>Order ID</th>
                                <th>Date of Purchase</th>
                                <th>Products</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order_items}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        :
        <Navigate to='/products'></Navigate>
    )
}