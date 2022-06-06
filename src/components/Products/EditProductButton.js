import React, {useState, useEffect} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function EditProductButton(props){
    const [isLoading, setIsLoading] = useState(false)

    const [productImage, setProductImage] = useState(props.product.image)
    const [name,setName] = useState(props.product.name)
    const [description,setDescription] = useState(props.product.description)
    const [price,setPrice] = useState(props.product.price)
    const [defaultCategory, setDefaultCategory] = useState('')
    const [categoryId, setCategoryId] = useState(props.product.category_id)
    const [categories, setCategories] = useState([])

    // States for showing modal
    const [showModal, setShowModal] = useState(false)

    // handle opening and closing of modal
    const openAddModal = () => setShowModal(true)
    const closeAddModal = () => setShowModal(false)

    const editProduct = (event) => {
        event.preventDefault()

        setIsLoading(true)

        const formData = new FormData()

        formData.append('image', productImage)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category_id', categoryId)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${props.product._id}/update`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: formData
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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
        .then(response => response.json())
        .then(result => {
            setCategories(result)
        })

        fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/${props.product.category_id}`)
        .then(response => response.json())
        .then(result => {
            setDefaultCategory(result.name)
        })
    }, [])

    let category_list = categories.map(category => {
        return(
            <option value={category._id}>{category.name}</option>
        )
    })

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
                            <Form.Label>Product Images</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                onChange={e => setProductImage(e.target.files[0])}
                            />
                    </Form.Group>
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
                        <Form.Group className='mb-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={event => setCategoryId(event.target.value)}>
                                <option value={categoryId}>{defaultCategory}</option>
                                {category_list}
                            </Form.Select>
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