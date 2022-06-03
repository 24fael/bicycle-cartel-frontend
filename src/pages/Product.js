import React, { useState, useContext, useEffect } from 'react'
import { Container, Button, Row, Col, Carousel, Badge } from 'react-bootstrap'
import UserContext from '../contexts/UserContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import CartContext from '../contexts/CartContext'

export default function Product(){
    const navigate = useNavigate()
    const { id } = useParams()
    const {user} = useContext(UserContext)
    const { cart } = useContext(CartContext)

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ isActive, setIsActive ] = useState('')
    const [ category, setCategory ] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
        .then(response => response.json())
        .then(result => {
            setName(result.name) 
            setDescription(result.description)
            setPrice(result.price)
            setIsActive(result.is_active)

            fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/${result.category_id}`)
            .then(response => response.json())
            .then(category => {
                setCategory(category.name)
            })
        })
    }, [])

    let addToCart = () => {
        let cart_items = []
        cart_items = JSON.parse(localStorage.getItem('cart_products')) || []

        cart_items.push({
            productId: id,
            name: name,
            description: description,
            price: price
        })

        localStorage.setItem('cart_products', JSON.stringify(cart_items))

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Added to Cart!'
        })
    }

    return(
        <Container className="mt-5">
            <Button className="mb-5 btn-secondary-custom" variant="dark" onClick={() => navigate(-1)}>🡰 Go back</Button>
            <Row>
                <Col md={6}>
                    <Carousel fade>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://picsum.photos/800/400"
                            alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col md={6}>
                    <h3>{name}</h3>
                    <span>
                        <Badge bg="light" text="dark">
                            {category}
                        </Badge>
                        <span> </span>
                        <Badge bg="light" text="dark">
                            {
                                isActive ? 'In Stock' : 'Out of Stock'
                            }
                        </Badge>
                    </span>
                    <p className="mt-3">{description}</p>
                    <h6>Price: Php{price}</h6>
                    <Button className="btn-secondary-custom mt-3" variant='dark' onClick={() => addToCart()}>
                        <FontAwesomeIcon icon={solid('cart-plus')} /> Add to Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}