import { connectToDB } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectToDB()

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json()
		const { email, password } = reqBody

		// check for user
		const user = await User.findOne({ email })

		if (!user) {
			return NextResponse.json({ error: 'User not found!' }, { status: 400 })
		}

		// check if password is valid
		const isValidPassword = await bcryptjs.compare(password, user.password)

		if (!isValidPassword) {
			return NextResponse.json({ error: 'Invalid Password' }, { status: 401 })
		}

		// creating token data
		const tokenData = {
			_id: user._id,
			username: user.username,
			email,
		}

		// generating token
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECERT!, {
			expiresIn: '1d',
		})

		// creating a response
		const response = NextResponse.json({
			message: 'Login Successfully',
			success: true,
		})
		response.cookies.set('token', token, {
			httpOnly: true,
			path: '/',
		})

		return response
	} catch (error: any) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
