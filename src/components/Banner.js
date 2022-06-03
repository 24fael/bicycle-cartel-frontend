import React from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Banner(props){
    return(
        <Row>
            <Col className='p-5 mt-3 text-center'>
                <h1>Bicycle Cartel</h1>
                <p>Your next go-to bike product dealer.</p>
                <Button className="btn-secondary-custom" as={Link} to={'/products'} variant="dark">Shop Now!</Button>
            </Col>
        </Row>
    )
}