import mongoose from 'mongoose'

export async function connectToDB() {
	try {
		mongoose.connect(process.env.MONGO_URL!)
		const connection = mongoose.connection

		connection.on('connect', () => {
			console.log('MongoDB connected successfully')
		})

		connection.on('error', () => {
			console.log('MongoDB connection Error!')
			console.log(Error)
		})
	} catch (error) {
		console.log('Something went wrong!')
		console.log(error)
	}
}
