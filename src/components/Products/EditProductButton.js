import React, {useState, useEffect} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function EditProductButton(props){
    const [isLoading, setIsLoading] = useState(false)
    const [name,setName] = useState(props.product.name)
    const [description,setDescription] = useState(props.product.description)
    const [price,setPrice] = useState(props.product.price)

    // States for showing modal
    const [showModal, setShowModal] = useState(false)

    // handle opening and closing of modal
    const openAddModal = () => setShowModal(true)
    const closeAddModal = () => setShowModal(false)

    const editProduct = (event) => {
        event.preventDefault()

        setIsLoading(true)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${props.product._id}/update`, {
            method: 'PATCH',
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
                    text: 'Course successfully updated!'
                })

                closeAddModal()
                props.refreshData()
            }
            else {
                setIsLoading(false)
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Something went wrong. Please try again.'
                })
            }
        })
    }

    return(
        <div>
            <Button className="btn-secondary-custom" variant="dark" onClick={openAddModal}>Edit</Button>
            
            {/* edit modal */}
            <Modal show={showModal} onHide={closeAddModal}>
                <Form onSubmit={ event => editProduct(event) }>
                    <Modal.Header closeButton>
                        <Modal.Title><h4>Edit Product</h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={description}
                                onChange={event => setDescription(event.target.value)}
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
                            {isLoading ? 'Loading..': 'Submit'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}