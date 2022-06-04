import React, { useState, useContext, useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import CartContext from '../contexts/CartContext'
import UserContext  from "../contexts/UserContext";
import {Table, Row, Col, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Cart(){
    const navigate = useNavigate()
    const {cart, setCart} = useContext(CartContext)
    const {user, setUser} = useContext(UserContext)
    
    const [cartItems, setCartItems] = useState([])
    const [ totalAmount, setTotalAmount ] = useState(0)
    let temp_total = 0

    function removeCartItem(id) {
        let new_items = cart.filter(item => item.id !== id)

        setCart(new_items)
    }

    useEffect(() => {
        // get total amount of all items
        cart.forEach(item => {
            temp_total += (item.price * item.quantity)
        });

        setTotalAmount(temp_total)

        // update cart for each change
        let items = cart.map(item => {
            return(
                <tr>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>x{item.quantity}</td>
                    <td className='text-center'>
                        <Button variant="dark" onClick={() => removeCartItem(item.id)}>
                            <FontAwesomeIcon icon={solid('trash-can')} />
                        </Button>
                    </td>
                </tr>
            )
        })

        setCartItems(items)
    }, [cart])

    return(
        (user.isAdmin === true || !user.regularUser) ?
            <Navigate to='/products'></Navigate>
        :
        <>
            <Button className="mt-5 mb-5 btn-secondary-custom" variant="dark" onClick={() => navigate(-1)}>🡰 Go back</Button>
            <Row class="mt-5">
                <Col>
                    <h1>Your Cart</h1>
                    {cart.length !== 0 ? 
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cartItems }
                            <tr>
                                <td></td>
                                <td className="text-center"><strong>Total Amount</strong></td>
                                <td><strong>{totalAmount}</strong></td>
                                <td colSpan={2}></td>
                            </tr>
                        </tbody>
                        </Table>
                    :
                        <p>Your cart is empty.</p>
                    }
                </Col>
            </Row>
        </>
    )
}