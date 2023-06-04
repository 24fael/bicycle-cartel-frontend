import React, {useEffect, useState} from "react";
import {Row, Col} from 'react-bootstrap'
import ProductListItem from "./ProductListItem";
import {useQuery} from 'react-query';

export default function ProductList(props){
    const [products, setProducts] = useState([])

    const searchProductsQuery = useQuery(
        ['searchProducts', props.searchCriteria],
        () => fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${props.searchCriteria}/search-active`).then((res) => res.json()),
        {
            enabled: false,
            fetchOnMount: false
        }
    );

    useEffect(() => {
    if (props.searchCriteria) {
        searchProductsQuery.refetch();
    }
    }, [props.searchCriteria]);

    // track changes
    useEffect(() => {
        const products_arr = props.products.map(product => {
            if(product.is_active === true){
                return(
                    <Col md={3} className="d-flex align-items-stretch" key={product._id}>
                        <ProductListItem product={product}/>
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