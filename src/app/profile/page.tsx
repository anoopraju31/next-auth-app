'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
	const [user, setUser] = useState()
	const router = useRouter()
	const logout = () => {
		axios
			.get('/api/users/logout')
			// .then((data) => console.log(data))
			.then(() => toast.success('Logout Successfully'))
			.then(() => {
				router.push('/login')
			})
			.catch((error: any) => {
				console.log(error)
				toast.error(error.message)
			})

		// try {
		// 	await axios.get('/api/users/logout')
		// 	toast.success('Logout successful')
		// 	router.push('/login')
		// } catch (error: any) {
		// 	console.log(error.message)
		// 	toast.error(error.message)
		// }
	}

	const getUserProfile = async () => {
		// axios
		// 	.get('/api/users/me')
		// 	.then((res) => console.log(res))
		// 	.catch((error) => console.log(error))

		const res = await axios.get('/api/users/me')
		console.log(res.data)
		// setData(res.data.data._id)
	}

	useEffect(() => {
		getUserProfile()
	}, [])

	return (
		<section className='h-screen text-white bg-gray-50 dark:bg-gray-900'>
			<div className='w-4/6 h-full mx-auto flex justify-center items-center flex-col'>
				<h1> Profile Page </h1>
				<hr />

				<button
					onClick={logout}
					className='w-full max-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-700 disabled:cursor-not-allowed cursor-pointer'>
					Logout
				</button>
			</div>
		</section>
	)
}
