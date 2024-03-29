import React, { useState, useContext, useEffect } from 'react'
import { Container, Button, Row, Col, Carousel, Badge, InputGroup, FormControl } from 'react-bootstrap'
import UserContext from '../contexts/UserContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import CartContext from '../contexts/CartContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Product(){
    const navigate = useNavigate()
    const { id } = useParams()
    const {user} = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ isActive, setIsActive ] = useState('')
    const [ category, setCategory ] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [productImage, setProductImage] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
        .then(response => response.json())
        .then(result => {
            setProductImage(result.image)
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

    const addToCart = () => {
        function checkIfExists(){
            if(cart.some(item => item.product_id === id)){
                // get index of matching products
                const index = cart.findIndex(item => item.product_id === id)
                
                // get previous quantity
                const previousQuantity = cart[index].quantity

                // remove object with that index
                const pseudo_cart = cart.splice(index, 1)
                setCart(pseudo_cart)

                // add current qty to previous qty
                return previousQuantity + quantity
            }
            else{
                return quantity
            }
        }

        let product = {
            id: Math.floor(100000 + Math.random() * 900000),
            product_id: id,
            name: name,
            description: description,
            price: price,
            quantity: checkIfExists()
        }
       
        setCart([...cart, product])

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Added to Cart!'
        })
    }

    function minusQuantity(){
        if(quantity <= 1){
            setQuantity(1)
        } else {
            setQuantity(quantity => quantity - 1)
        }
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
                            src={productImage}
                            alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col md={6}>
                    <h3>{name || <Skeleton/>}</h3>
                    <span>
                        <Badge bg="light" text="dark">
                            {category || <Skeleton width={100}/>}
                        </Badge>
                        <span> </span>
                        <Badge bg="light" text="dark">
                            {
                                isActive ? 'In Stock' : 'Out of Stock'
                            }
                        </Badge>
                    </span>
                    <p className="mt-3">{description || <Skeleton count={3} />}</p>
                    <h6>₱{price || <Skeleton width={30}/>}</h6>
                    <div className='d-flex justify-content-start align-items-center mt-3'>
                        <InputGroup className="w-25">
                            <InputGroup.Text as={Button} onClick={() => setQuantity(quantity => quantity + 1)} className="btn-secondary-custom" variant="dark" id="inputGroup-sizing-default">
                                +
                            </InputGroup.Text>
                            <FormControl
                                className="text-center"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                type="number"
                                value={quantity}
                                onChange={event => setQuantity(event.target.value)}
                            />
                            <InputGroup.Text as={Button} onClick={() => minusQuantity()} className="btn-secondary-custom" variant="dark" id="inputGroup-sizing-default">
                                -
                            </InputGroup.Text>
                        </InputGroup>
                        <span className="p-1"></span>
                        {
                            user.regularUser === true ?
                                <Button className="btn-secondary-custom" variant='dark' onClick={() => addToCart()}>
                                    <FontAwesomeIcon icon={solid('cart-plus')} /> Add to Cart
                                </Button>
                            :
                                <Button as={Link} to={'/login'} className="btn-secondary-custom" variant='dark'>
                                    <FontAwesomeIcon icon={solid('cart-plus')} /> Login to Purchase
                                </Button>
                        }
                        
                    </div>
                </Col>
            </Row>
        </Container>
    )
}