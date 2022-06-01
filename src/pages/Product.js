import React, { useState, useContext, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import UserContext from '../contexts/UserContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Product(){
    const navigate = useNavigate()
    const { id } = useParams()

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
        .then(response => response.json())
        .then(result => {
            setName(result.name) 
            setDescription(result.description)
            setPrice(result.price)
        })
    }, [])

    // add to cart functionality
    // const enroll = (course_id) => {
    //     fetch(`${process.env.REACT_APP_API_BASE_URL}/users/enroll`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify({
    //             course_id: course_id
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(result => {
    //         if(result){
    //             Swal.fire({
    //                 title: 'Successfully enrolled',
    //                 icon: 'success',
    //                 text: `You have enrolled for ${name}, Welcome to Iskwela!`
    //             })

    //             navigate('/courses')
    //         }
    //         else {
    //             Swal.fire({
    //                 title: 'Error',
    //                 icon: 'error',
    //                 text: 'Something went wrong.'
    //             })
    //         }
    //     })
    // }

    const {user} = useContext(UserContext)

    return(
        <Container>
            <Card>
                <Card.Header>
                    <h4>{name}</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    <h6>Price: PHP{price}</h6>
                </Card.Body>
                <Card.Footer>
                <Button className="btn-secondary-custom" variant='dark'>Add to Cart</Button>
                    {/* { user.accessToken ?
                        <Button variant='primary' onClick={() => enroll(id)}>Enroll</Button>
                        :
                        <Button variant='warning' as={Link} to={'/login'}>Login to Enroll</Button>
                    } */}
                </Card.Footer>
            </Card>
        </Container>
    )
}