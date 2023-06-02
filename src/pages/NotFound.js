import React from "react";
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import Lottie from "lottie-react";
import NotFoundAnimation from "../assets/animations/notFound.json";

export default function NotFound() {
    const animation_style = {
        height: 300,
    };

    return(
        <Row>
            <Col>
                <div className="p-5 mt-3 text-center">
                    <Lottie animationData={NotFoundAnimation} style={animation_style} loop={true} />
                    <h1>Page Not Found</h1>
                    <p>Looks like you're wandering too far.</p>
                    <Link to="/">Go Home</Link>
                </div>
            </Col>
        </Row>
    )
}