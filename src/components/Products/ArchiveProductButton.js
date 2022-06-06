//ArchiveCourse.js
import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveCourse({ productId, isActive, refreshData}) {
	const [isLoading, setIsLoading] = useState(false)

	const archiveToggle = (productId) => {
		setIsLoading(true)

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ productId }/archive`,{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data =>{
			if(data) {
				setIsLoading(false)
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Product successfully disabled'
				})
				refreshData()
			}else {
				setIsLoading(false)
				Swal.fire({
					title: 'error',
					icon: 'error',
					text: 'Something went wrong'
				})
				refreshData()
			}
		})
	}

	const activateToggle = (productId) => {
		setIsLoading(true)
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ productId }/activate`,{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(response => response.json())
		.then(result => {
			if(result) {
				setIsLoading(false)
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully activated'
				})
				refreshData()
			}else {
				setIsLoading(false)
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong'
				})
				refreshData()
			}
		})
	}

	return(

		<>

			{ isActive  ?
				<Button variant="danger" disabled={isLoading} onClick={() => archiveToggle(productId)}>
					{isLoading ? 'Loading' : 'Disable'}
				</Button>

				:

				<Button className="btn-secondary-custom" variant="dark" disabled={isLoading} onClick={() => activateToggle(productId)}>
					{isLoading ? 'Loading' : 'Enable'}
				</Button>

			}
			
		</>
		)
}