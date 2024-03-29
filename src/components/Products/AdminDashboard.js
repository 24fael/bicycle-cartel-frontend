import {useState, useEffect} from "react";
import {Table} from "react-bootstrap"
import AddProduct from "./AddProduct";
import ArchiveProductButton from "./ArchiveProductButton";
import EditProductButton from "./EditProductButton";

export default function AdminDashboard(props){
    const [products, setProducts] = useState([])

    useEffect(() => {
        const product_array = props.products.map(product => {
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.is_active ? 'text-success': 'text-danger'}>{product.is_active ? 'In Stock': 'Out of Stock'}</td>
                    <td>
                        <EditProductButton product={product} refreshData={props.refreshData}/>
                    </td>
                    <td>
                        <ArchiveProductButton productId={product._id} isActive={product.is_active} refreshData={props.refreshData}/>
                    </td>
                </tr>
            )
        })

        setProducts(product_array)
    }, [props.products, props.refreshData])

    return(
        <div className="mt-5">
            <div className="text-center my-4">
                <h1>Admin Dashboard</h1>
                <AddProduct refreshData={props.refreshData}/>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </div>
    )
}