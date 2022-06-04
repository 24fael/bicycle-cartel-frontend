import React from 'react'
import {Row, Col, Card, OverlayTrigger, Tooltip} from 'react-bootstrap'

export default function Highlights(){
    return(
        <Row className="mt-5">
            <Col xs={12} md={4}>
                <OverlayTrigger overlay={
                    <Tooltip id='tooltip-bottom'>
                        Vintage/non-vintage built bikes for smooth tarmac or gravel.
                    </Tooltip>
                }>
                    <Card className="card-highlight">
                        <Card.Img src={require('../assets/images/built bike.jpg')} alt="Built Bikes" />
                        <Card.ImgOverlay>
                            <Card.Title className="text-white">
                                <h2>Built Bikes</h2>
                            </Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                </OverlayTrigger>
            </Col>
            <Col xs={12} md={4}>
                <OverlayTrigger overlay={
                    <Tooltip id='tooltip-bottom'>
                        Parts make the bike go 'round, that's why we offer them.
                    </Tooltip>
                }>
                    <Card className="card-highlight">
                        <Card.Img src={require('../assets/images/bike_parts.jpg')} alt="Bike Parts" />
                        <Card.ImgOverlay>
                            <Card.Title className="text-white">
                                <h2>Bike Parts</h2>
                            </Card.Title>
                        </Card.ImgOverlay>
                    </Card>
                </OverlayTrigger>
            </Col>
            <Col xs={12} md={4}>
                <OverlayTrigger overlay={
                     <Tooltip id='tooltip-bottom'>
                        Bike bags? Lights? Chainstay protector? We got it.
                    </Tooltip>
                }>
                <Card className="card-highlight">
                    <Card.Img src={require('../assets/images/bike accessories.jpg')} alt="Bike Accessories" />
                    <Card.ImgOverlay>
                        <Card.Title className="text-white">
                            <h2>Bike Accessories</h2>
                        </Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </OverlayTrigger>
            </Col>
        </Row>
    )
}