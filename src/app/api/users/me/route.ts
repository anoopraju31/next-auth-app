import { getDataFromToken } from '@/helpers/getDataFromToken'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import User from '@/models/userModel'
import { connectToDB } from '@/dbConfig/dbConfig'

connectToDB()

export async function GET(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request)
		// console.log(userId)

		const user = await User.findOne({ _id: userId }).select(
			'-password -isAdmin',
		)
		// console.log(user)

		return NextResponse.json({
			mesaaage: 'User found',
			data: user,
		})
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
