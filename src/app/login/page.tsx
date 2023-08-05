'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'

export default function LoginPage() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setButtonDisabled(user.email === '' || user.password === '' ? true : false)
	}, [user])

	const handleSignUp = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			setButtonDisabled(true)
			setIsLoading(true)

			const response = await axios.post('/api/users/login', user)
			// console.log(response.data)
			router.push('/')
		} catch (error: any) {
			toast.error(error.message)
			console.log(error)
		} finally {
			setUser({
				email: '',
				password: '',
			})
			setIsLoading(false)
		}
	}
	return (
		<section className='h-screen  bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<h1 className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
					Auth App
				</h1>

				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white'>
							Sign In
						</h1>

						<form className='space-y-4 md:space-y-6' onSubmit={handleSignUp}>
							{/* email */}
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									value={user.email}
									onChange={(e) =>
										setUser((prev) => ({ ...prev, email: e.target.value }))
									}
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>

							{/* password */}
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									value={user.password}
									onChange={(e) =>
										setUser((prev) => ({ ...prev, password: e.target.value }))
									}
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
								/>
							</div>

							<div className='flex items-center justify-between'>
								{/* Remember Me */}
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											required
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='remember'
											className='text-gray-500 dark:text-gray-300'>
											Remember me
										</label>
									</div>
								</div>

								{/* Forgot Password */}
								<Link
									href='/'
									className='text-sm font-medium  text-primary-600 hover:underline  dark:text-primary-500'>
									Forgot password?
								</Link>
							</div>

							{/* Sign Up Button */}
							<button
								type='submit'
								disabled={buttonDisabled}
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-700 disabled:cursor-not-allowed cursor-pointer'>
								{isLoading ? 'Signing In' : 'Sign In'}
							</button>

							{/* Sign Up  */}
							<p className='text-sm font-light text-center text-gray-500 dark:text-gray-400'>
								Don{"'"}t have an account yet?{' '}
								<Link
									href='/sign-up'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
									Sign Up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
