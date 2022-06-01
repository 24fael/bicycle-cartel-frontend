import React, {useEffect, useState} from "react";
import ProductListItem from "./ProductListItem";

export default function ProductList(props){
    const [products, setProducts] = useState([])

    // track changes
    useEffect(() => {
        const products_arr = props.products.map(product => {
            if(product.is_active === true){
                return(
                    <ProductListItem key={product._id} product={product}/>
                )
            } else {
                return null
            }
        })

        setProducts(products_arr)

    }, [props.products])

    return(
        <div>
            {products}
        </div>
    )
}