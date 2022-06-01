import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// built-in state management

export default function ProductListItem({product}){
    return(
        <Card className="my-3">
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>Php {product.price}</Card.Text>

                <Button className="btn-secondary-custom" variant="dark" as={Link} to={`/products/${product._id}`}>Details</Button>
            </Card.Body>
        </Card>
    )
}

// ProductListItem.propTypes = {
//     product: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired
//     })
// }