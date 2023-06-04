import {useQuery} from 'react-query'

export const useProductQueries = (categoryId, searchCriteria) => {
    // Get all products query
    const getAllProductsQuery = useQuery("getAllProducts", () =>
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`).then((res) => res.json()),
    {
        keepPreviousData: true,
        enabled: true
    }
    );

    // Get all categories query
    const getAllCategoriesQuery = useQuery("getAllCategories", () =>
    fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/`).then((res) => res.json()),
    {
        keepPreviousData: true,
        enabled: true
    }
    );

    // Filter by category query
    const filterByCategoryQuery = useQuery(["filterByCategory", categoryId], () =>
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${categoryId}/filter`).then((res) => res.json()),
    {
        enabled: false
    }
    );

    // Search products query
    const searchProductsQuery = useQuery(["searchProducts", searchCriteria], () =>
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${searchCriteria}/search-active`).then((res) => res.json()),
    {
        enabled: false
    }    
    );

    return {
        getAllProductsQuery,
        getAllCategoriesQuery,
        filterByCategoryQuery,
        searchProductsQuery,
    };
};