import React, { useState, useEffect } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function AddProduct(props){
    const [isLoading, setIsLoading] = useState(false)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)

    // States for showing modal
    const [showModal, setShowModal] = useState(false)

    // handle opening and closing of modal
    const openAddModal = () => setShowModal(true)
    const closeAddModal = () => setShowModal(false)

    // handle adding course
    const addProduct = (event) => {
        event.preventDefault()
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result) {
                setIsLoading(false)
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product added successfully!'
                })

                closeAddModal()
                props.refreshData()
            }
            else {
                setIsLoading(false)
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Please try again.'
                })
            }

            // reset fields after
            setName('')
            setDescription('')
            setPrice(0)
        })
    }

    return(
        <div>
            <Button className="btn-secondary-custom" variant="dark" onClick={openAddModal}>Add New Product</Button>
            
            {/* add modal */}
            <Modal show={showModal} onHide={closeAddModal}>
                <Form onSubmit={ event => addProduct(event) }>
                    <Modal.Header closeButton>
                        <Modal.Title><h4>Add Product</h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="Enter Product Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                placeholder="Enter Product Description"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddModal}>Close</Button>
                        <Button className="btn-secondary-custom" variant="dark" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading' : 'Submit'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}