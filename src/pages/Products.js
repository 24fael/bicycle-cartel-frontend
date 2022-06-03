import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../contexts/UserContext'
import AdminDashboard from '../components/Products/AdminDashboard'
import ProductList from '../components/Products/ProductList'
import Loading from '../components/Loading'
import {Row, Col} from 'react-bootstrap'
import Search from '../components/Products/Search'

export default function Products() {
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState([false])

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

    useEffect(() => {
        getAllProducts()
    }, [])

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
                                <h1>Product Catalog</h1>
                                <Search/>
                            </Col>
                        </Row>
                        <ProductList products={allProducts}/>
                    </>
            }
        </div>
    )
}