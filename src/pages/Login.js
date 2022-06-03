import React, {useState, useEffect, useContext} from "react";
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import Swal from "sweetalert2";
import UserContext  from "../contexts/UserContext";
import {Navigate, useNavigate} from 'react-router-dom'

export default function Login() {
    let navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // button
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        if(email !== '' && password !== '')
        {
            setIsActive(true)
        }
        else
        {
            setIsActive(false)
        }
    }, [email, password])

    function authenticate(event) {
        event.preventDefault()

        setIsLoading(true)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.accessToken !== undefined){
                localStorage.setItem('accessToken', result.accessToken)

                setUser({
                    accessToken: result.accessToken 
                })

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: "You're logged in!"
                })

                fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${result.accessToken}`
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if(result.is_admin === true){
                        localStorage.setItem('isAdmin', result.is_admin)
                        localStorage.setItem('firstName', result.first_name)

                        setUser({
                            isAdmin: result.is_admin
                        })

                        setIsLoading(false)

                        navigate('/products')
                    }
                    else{
                        setIsLoading(false)
                        navigate('/')
                    }
                })
            }
            else {
                setIsLoading(false)
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Something went wrong.'
                })
            }

            setEmail('')
            setPassword('')
        })
    }

    return (
        (user.accessToken !== null) ? 
            <Navigate to='/products'></Navigate>
        :
        <>
            <Row>
                <Col className="d-flex justify-content-center mt-5">
                    <Card className="w-50">
                        <Form onSubmit={authenticate}>
                        <Card.Header><h1>Login</h1></Card.Header>
                        <Card.Body>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your Email"
                                        required
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your Password"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            {isActive ? 
                                <Button variant="dark" type="submit" className="mt-2 btn-secondary-custom" disabled={isLoading}>
                                    {
                                        isLoading ? 'Loading..' : 'Login'
                                    }
                                </Button>
                                :
                                <Button variant="dark" type="submit" className="mt-2 btn-secondary-custom" disabled>Login</Button>
                            }  
                        </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}