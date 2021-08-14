import fetch from 'node-fetch'
import Booking from '../models/booking'

export type DeciplusSession = {
	token: string
}

export type DeciplusSignInResponse = {
	tokens: {
		clubs: {
			[key: string]: [{
				token: string
			}]
		}
	}
}

export type DeciplusBookingsResponse = {
	bookings: Array<{
		booking: {
			startDate: string
			activity: {
				name: string
			}
		}
	}>
}

const baseUrl = 'https://api.deciplus.pro/deciplus-members/v1'
const baseUrlMembers = 'https://api.deciplus.pro/members/v1'
const signInUrl = `${baseUrl}/authenticate`
const bookingsUrl = `${baseUrlMembers}/bookings/upcoming`

type RequestParameters = {
	url: string,
	method: string,
	session?: DeciplusSession,
	body?: string
}

const request = async <T>({ url, method, session, body }: RequestParameters): Promise<T> => {	
	const response = await fetch(url, {
		method,
		body,
		headers: {
			'Content-Type': 'application/json',
			...(session && { 'x-access-token': session.token })
		}
	})

	if (response.status !== 200) {
		throw new Error('')
	}

	return await response.json() as T 
}

const signIn = async (email: string, password: string): Promise<DeciplusSession> => {
	const response = await request<DeciplusSignInResponse>({
		url: signInUrl,
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		})
	})

	const session: DeciplusSession = {
		token: response.tokens.clubs.cfstsimon[0].token
	}

	return session
}

const getBookings = async (session: DeciplusSession): Promise<Booking[]> => {
	const response = await request<DeciplusBookingsResponse>({
		url: bookingsUrl,
		session,
		method: 'GET'
	})

	return response.bookings.map(({booking}): Booking => {
		return {
			activity: booking.activity.name,
			date: new Date(booking.startDate)
		}
	})
}

const DeciplusClient = {
	signIn,
	getBookings
}

export default DeciplusClient
