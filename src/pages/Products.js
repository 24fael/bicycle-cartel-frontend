import {useContext, useState, lazy, Suspense} from 'react'
import UserContext from '../contexts/UserContext'
import ProductList from '../components/Products/ProductList'
import Loading from '../components/Loading'
import {Row, Col, Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import { useProductQueries } from '../hooks/Products/useProductQueries'

const AdminDashboard = lazy(() => import('../components/Products/AdminDashboard'))

export default function Products() {
    // For handling the data from the search input field
    const [searchCriteria, setSearchCriteria] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    // Initializes the UserContext to be able to use the global 'user' state
    const { user } = useContext(UserContext);

    // Initializes the Queries to be used on the file for fetching data
    const { getAllProductsQuery, getAllCategoriesQuery, filterByCategoryQuery, searchProductsQuery } = useProductQueries(categoryId, searchCriteria);

    let category_list = null

    if(getAllCategoriesQuery.isFetched){
        category_list = getAllCategoriesQuery.data.map((category) => {
            return (
                <option value={category._id}>{category.name}</option>
            );
        });
    }
    
    return (
        <div>
        {user.isAdmin === true ? (
            <Suspense fallback={"Loading Admin Dashboard.."}>
                <AdminDashboard products={getAllProductsQuery.data} refreshData={getAllProductsQuery.refetch} />
            </Suspense>
        ) : (
            <>
            <Row>
                <Col className="d-flex justify-content-between align-items-center mt-5">
                <h1>Product Catalog</h1>
                <span className="d-flex align-items-center">
                    <Form.Select className="w-75" onClick={() => setIsDisabled(prev => !prev)} onChange={(event) => {
                            setCategoryId(event.target.value)
                        }
                    }>
                        <option disabled={isDisabled}>Filter by Category</option>
                        {category_list}
                    </Form.Select>
                    <span className="p-1"></span>
                    <InputGroup>
                    <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Search for a Product"
                        value={searchCriteria}
                        onChange={(event) => {
                            setSearchCriteria(event.target.value)
                        }}
                    />
                    <InputGroup.Text
                        disabled={searchCriteria === "" && categoryId === ""}
                        as={Button}
                        onClick={() => {
                                setSearchCriteria("")
                                setCategoryId("")
                            }
                        } // Clears the searchCriteria state
                        className="btn-secondary-custom"
                        variant="dark"
                        id="inputGroup-sizing-default"
                    >
                        Reset
                    </InputGroup.Text>
                    </InputGroup>
                </span>
                </Col>
            </Row>
            
            {getAllProductsQuery.isLoading || getAllCategoriesQuery.isLoading || filterByCategoryQuery.isLoading || searchProductsQuery.isLoading ? (
                <>
                    <Loading />
                    <p>Loading our products, please wait.</p>
                </>
            ) : (
                <ProductList searchCriteria={searchCriteria} categoryId={categoryId} products={filterByCategoryQuery.data || searchProductsQuery.data || getAllProductsQuery.data} />
            )}
            </>
        )}
        </div>
    );
}