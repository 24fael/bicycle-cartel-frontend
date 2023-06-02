import React, { useState, useEffect } from 'react'
import {Card, Button, ListGroup, ListGroupItem, Badge} from 'react-bootstrap'
import ReadMoreReact from 'read-more-react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// built-in state management

export default function ProductListItem({product}){
    const [category, setCategory] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/${product.category_id}`)
        .then(response => response.json())
        .then(result => {
            setCategory(result.name)
        })
    }, [])

    return(
        <Card className="my-3 shadow-sm w-100">
            <Card.Img variant="top" src={product.image} alt={`Picture of ${product.name}`}/>
            <Card.Body>
                <Card.Title className="product-link" as={Link} to={`/products/${product._id}`}><h5>{product.name}</h5></Card.Title>
                <ReadMoreReact
                    text={product.description}
                    min={80}
                    ideal={80}
                    max={200}
                    readMoreText={<strong>Read more</strong>}
                />
                <Card.Subtitle className="mt-3">Price:</Card.Subtitle>
                <Card.Text>₱<strong>{product.price}</strong></Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <Badge bg="light" text="dark">
                        {category}
                    </Badge>
                    <span> </span>
                    <Badge bg="light" text="dark">
                            {
                                product.is_active ? 'In Stock' : 'Out of Stock'
                            }
                    </Badge>
                </ListGroupItem>
            </ListGroup>
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