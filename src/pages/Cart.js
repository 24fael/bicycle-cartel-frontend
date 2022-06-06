import React, { useState, useContext, useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import CartContext from '../contexts/CartContext'
import UserContext  from "../contexts/UserContext";
import {Row, Col, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import CartTable from '../components/Cart/CartTable'
import Swal from 'sweetalert2';

export default function Cart(){
    const navigate = useNavigate()
    const {cart, setCart} = useContext(CartContext)
    const {user, setUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

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
                    <td>₱{item.price}</td>
                    <td>x{item.quantity}</td>
                    <td>₱{item.price * item.quantity}</td>
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

    function handleCheckout() {
        setIsLoading(true)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                order_products: cart
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                setIsLoading(false)
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'You have created an order!'
                })

                setCart([])

                navigate('/orders')
            }
            else{
                setIsLoading(false)
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Something went wrong.'
                })
            }
        })
    }

    return(
        (user.isAdmin === true || !user.regularUser) ?
            <Navigate to='/products'></Navigate>
        :
        <>
            <Button className="mt-5 mb-5 btn-secondary-custom" variant="dark" onClick={() => navigate(-1)}>🡰 Go back</Button>
            <Row class="mt-5">
                    <h1>Your Cart</h1>
                    {cart.length !== 0 ? 
                        <>
                            <Col sm={12}>
                                <CartTable cartItems={cartItems} totalAmount={totalAmount}/>
                            </Col>
                             <Col sm={12} className="w-100 d-flex justify-content-end">
                                <Button className="btn-secondary-custom w-25" variant="dark" size='lg' onClick={handleCheckout} disabled={isLoading}>
                                    <FontAwesomeIcon icon={solid('basket-shopping')} />
                                    {
                                        isLoading ? 
                                            ' Loading..'
                                        : 
                                            ' Checkout'
                                    }
                                </Button>
                            </Col>
                        </>
                    :
                        <Col>
                            <p>Your cart is empty.</p>
                        </Col>
                    }
            </Row>
        </>
    )
}