import React, {useEffect, useState} from "react";
import {Row, Col} from 'react-bootstrap'
import ProductListItem from "./ProductListItem";

export default function ProductList(props){
    const [products, setProducts] = useState([])
    // track changes
    useEffect(() => {
        const products_arr = props.products.map(product => {
            if(product.is_active === true){
                return(
                    <Col md={3}>
                        <ProductListItem key={product._id} product={product}/>
                    </Col>
                )
            } else {
                return null
            }
        })

        setProducts(products_arr)

    }, [props.products])

    return(
        <div>
            <Row>
                {products}
            </Row>
        </div>
    )
}