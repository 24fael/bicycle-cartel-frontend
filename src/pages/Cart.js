import React, { useState, useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import CartContext from '../contexts/CartContext'
import {Table, Row, Col, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Cart(){
    const navigate = useNavigate()
    const cart = JSON.parse(localStorage.getItem('cart_products'))
    
    const [cartItems, setCartItems] = useState([])
    const [ totalAmount, setTotalAmount ] = useState(0)
    let temp_total = 0

    function removeCartItem(productId) {
        let index = cart.findIndex(item => {
            return item.productId === productId
        })

        cart.splice(index, 1)

        localStorage.setItem('cart_products', JSON.stringify(cart))
    }

    useEffect(() => {
        // get total amount of all items
        cart.forEach(item => {
            temp_total += item.price
        });

        setTotalAmount(temp_total)

        // update cart for each change
        let items = cart.map(item => {
            return(
                <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td className='text-center'>
                        <Button variant="dark" onClick={() => removeCartItem(item.productId)}>
                            <FontAwesomeIcon icon={solid('trash-can')} />
                        </Button>
                    </td>
                </tr>
            )
        })

        setCartItems(items)
    }, [cart])

    return(
        <>
            <Button className="mt-5 mb-5 btn-secondary-custom" variant="dark" onClick={() => navigate(-1)}>🡰 Go back</Button>
            <Row class="mt-5">
                <Col>
                    <h1>Your Cart</h1>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cartItems }
                        <tr>
                            <td></td>
                            <td className="text-center"><strong>Total Amount</strong></td>
                            <td>{totalAmount}</td>
                            <td></td>
                        </tr>
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}