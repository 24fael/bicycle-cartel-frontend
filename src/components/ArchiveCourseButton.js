//ArchiveCourse.js
import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveCourse({ courseId, isActive, refreshData}) {
	const [isLoading, setIsLoading] = useState(false)

	const archiveToggle = (courseId) => {
		setIsLoading(true)

		fetch(`${process.env.REACT_APP_API_BASE_URL}/courses/${ courseId }/archive`,{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true) {
				setIsLoading(false)
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Course successfully disabled'
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

	const activateToggle = (courseId) => {
		setIsLoading(true)
		fetch(`${process.env.REACT_APP_API_BASE_URL}/courses/${ courseId }/activate`,{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(response => response.json())
		.then(result => {
			if(result === true) {
				setIsLoading(false)
				Swal.fire({
					title: 'success',
					icon: 'success',
					text: 'Course successfully activated'
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

	return(

		<>

			{ isActive  ?
				<Button variant="danger" size="sm" disabled={isLoading} onClick={() => archiveToggle(courseId)}>
					{isLoading ? 'Loading' : 'Disable'}
				</Button>

				:

				<Button variant="success" size="sm" disabled={isLoading} onClick={() => activateToggle(courseId)}>
					{isLoading ? 'Loading' : 'Enable'}
				</Button>

			}
			
		</>
		)
}