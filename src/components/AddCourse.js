import React, { useState, useEffect } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function AddCourse(props){
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
    const addCourse = (event) => {
        event.preventDefault()
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/courses/create`, {
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
                    text: 'Course added successfully!'
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
            <Button variant="primary" onClick={openAddModal}>Add new Course</Button>
            
            {/* add modal */}
            <Modal show={showModal} onHide={closeAddModal}>
                <Form onSubmit={ event => addCourse(event) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
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
                        <Button variant="success" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading' : 'Submit'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}