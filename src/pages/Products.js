import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../contexts/UserContext'
import AdminDashboard from '../components/AdminDashboard'
import ProductList from '../components/Products/ProductList'

export default function Products() {
    const [allProducts, setAllProducts] = useState([])

    const {user} = useContext(UserContext)

    const getAllProducts = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
        .then(response => response.json())
        .then(result => {
            setAllProducts(result)
        })
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return(
        <div>
            { (user.isAdmin === true) ?
                <AdminDashboard products={allProducts} refreshData={getAllProducts}/>
                :
                <>
                    <h1>Products</h1>
                    <ProductList products={allProducts}/>
                </>
            }
        </div>
    )
}