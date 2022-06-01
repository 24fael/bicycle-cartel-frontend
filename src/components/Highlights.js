import React from 'react'
import {Row, Col, Card} from 'react-bootstrap'

export default function Highlights(){
    return(
        <Row className="mt-5">
            <Col xs={12} md={4}>
                <Card className="card-highlight">
                    <Card.Body>
                        <Card.Title>
                            <h2>Built Bikes</h2>
                        </Card.Title>

                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi tenetur reiciendis, quisquam, dolores vero quis veritatis illum a mollitia ipsa doloremque sint. Repellendus libero labore adipisci quisquam laudantium vel eaque.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="card-highlight">
                    <Card.Body>
                        <Card.Title>
                            <h2>Bike Parts</h2>
                        </Card.Title>

                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi tenetur reiciendis, quisquam, dolores vero quis veritatis illum a mollitia ipsa doloremque sint. Repellendus libero labore adipisci quisquam laudantium vel eaque.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="card-highlight">
                    <Card.Body>
                        <Card.Title>
                            <h2>Bike Accessories</h2>
                        </Card.Title>

                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi tenetur reiciendis, quisquam, dolores vero quis veritatis illum a mollitia ipsa doloremque sint. Repellendus libero labore adipisci quisquam laudantium vel eaque.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}