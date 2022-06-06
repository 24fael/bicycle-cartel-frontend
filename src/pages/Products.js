import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../contexts/UserContext'
import AdminDashboard from '../components/Products/AdminDashboard'
import ProductList from '../components/Products/ProductList'
import Loading from '../components/Loading'
import {Row, Col, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Products() {
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState([false])
    const [categories, setCategories] = useState([])

    const [searchCriteria, setSearchCriteria] = useState('')

    const {user} = useContext(UserContext)

    const getAllProducts = () => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
        .then(response => response.json())
        .then(result => {
            setAllProducts(result)
            setIsLoading(false)
        })
    }

    const getAllCategories = () => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/`)
        .then(response => response.json())
        .then(result => {
            setCategories(result)
            setIsLoading(false)
        })
    }

    const filterByCategory = (category_id) => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${category_id}/filter`)
        .then(response => response.json())
        .then(result => {
            setAllProducts(result)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getAllProducts()
        getAllCategories()
    }, [])

    const category_list = categories.map(category => {
        return(
            <option value={category._id}>{category.name}</option>
        )
    })

    const handleProductSearch = () => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${searchCriteria}/search-active`)
        .then(response => response.json())
        .then(result => {
            setAllProducts(result)
            setIsLoading(false)
        })
    }

    return(
        <div>
            { 
                isLoading ?
                    <Row>
                        <Col className="d-flex justify-content-center mt-5">
                            <Loading/>
                        </Col>
                    </Row> 
                :
                (user.isAdmin === true) ?
                    <AdminDashboard products={allProducts} refreshData={getAllProducts}/>
                :
                    <>
                        <Row>
                            <Col className="d-flex justify-content-between align-items-center mt-5">
                                <span className="d-flex align-items-center">
                                    <h1>Product Catalog</h1>
                                    <span className="p-2"></span>
                                    <Button className="btn-secondary-custom mb-2" variant="dark" onClick={() => getAllProducts()}>
                                        <FontAwesomeIcon icon={solid('rotate-right')} /> Refresh
                                    </Button>
                                </span>
                                <span className="d-flex align-items-center">
                                <Form.Select className="w-75" onChange={event => filterByCategory(event.target.value)}>
                                    <option>Filter by Category</option>
                                    {category_list}
                                </Form.Select>
                                <span className="p-1"></span>
                                <InputGroup>
                                    <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Search for a Product"
                                    value={searchCriteria}
                                    onChange={event => setSearchCriteria(event.target.value)}
                                    />
                                    <InputGroup.Text disabled={searchCriteria === ''} as={Button} onClick={() => handleProductSearch()} className="btn-secondary-custom" variant="dark" id="inputGroup-sizing-default">
                                        <FontAwesomeIcon icon={solid('magnifying-glass')} /> Search
                                    </InputGroup.Text>
                                </InputGroup>
                                </span>
                            </Col>
                        </Row>
                        <ProductList products={allProducts}/>
                    </>
            }
        </div>
    )
}