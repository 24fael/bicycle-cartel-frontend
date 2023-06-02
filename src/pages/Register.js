import React, { useEffect, useState, useContext } from 'react'
import {Row, Col, Form, Button, Card, Image} from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../contexts/UserContext'
import Lottie from "lottie-react";
import RoadCyclistAnimation from "../assets/animations/roadCyclist.json";

export default function Register(){
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [mobileNumber, setMobileNumber] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [verifyPassword, setVerifyPassword] = useState('')
    let [isActive, setisActive] = useState(false)
    let [togglePage, setTogglePage] = useState(false)
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(
            (email !== '' && password !== '' && verifyPassword !== '')
            &&
            (password === verifyPassword)
        )
        {
            setisActive(true)
        }else {
            setisActive(false)
        }
    }, [email, password, verifyPassword])

    function registerUser(event) {
        event.preventDefault()
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                mobile_number: mobileNumber
            })
        })
        .then(response => {
            setIsLoading(false)
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Successfully registered! You may now log in.'
            })

            // clear all fields
            setFirstName('')
            setLastName('')
            setMobileNumber('')
            setEmail('')
            setPassword('')
            setVerifyPassword('')

            navigate('/login')
        })
    }

    const animation_style = {
        height: 468,
    };

    return(
        (user.accessToken !== null) ?
            <Navigate to='/products'/>
        :
        <React.Fragment>
            <Row className='mt-5'>  
                <Col md={6}>
                    <Lottie animationData={RoadCyclistAnimation} style={animation_style} />
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                    <Card className="mt-5 w-75">
                        <Form onSubmit={e => registerUser(e)}>
                            <Card.Header className=""><h1>Register</h1></Card.Header>
                            <Card.Body>
                                <div className={togglePage === true ? 'd-none' : ''}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your First Name"
                                            required
                                            value={firstName}
                                            onChange={(event) => {setFirstName(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your Last Name"
                                            required
                                            value={lastName}
                                            onChange={(event) => {setLastName(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Mobile Number:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your Mobile Number"
                                            required
                                            value={mobileNumber}
                                            onChange={(event) => {setMobileNumber(event.target.value)}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={togglePage === false ? 'd-none' : ''}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your Email"
                                            required
                                            value={email}
                                            onChange={(event) => {setEmail(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your Password"
                                            required
                                            value={password}
                                            onChange={(event) => {setPassword(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Verify Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Verify your Password"
                                            required
                                            value={verifyPassword}
                                            onChange={(event) => {setVerifyPassword(event.target.value)}}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Text className="text-muted">
                                We'll never share your data with anyone.
                                </Form.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                {
                                    (togglePage === false) ? 
                                    (
                                        <Button className="btn-secondary-custom" variant="dark" onClick={() => {setTogglePage(true)}}>Next 🡲</Button>
                                    )
                                    :
                                    (
                                        
                                        isActive ? 
                                            <>
                                                <Button className="btn-secondary-custom" variant="dark" onClick={() => {setTogglePage(false)}}>🡰 Back</Button>
                                                <Button className="btn-secondary-custom" variant="dark" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Loading..' : 'Register'}
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <Button className="btn-secondary-custom" variant="dark" onClick={() => {setTogglePage(false)}}>🡰 Back</Button>
                                                <Button className="btn-secondary-custom" variant="dark" type="submit" disabled>Register</Button>     
                                            </>
                                    )
                                }
                            </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}