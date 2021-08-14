import fetch from 'node-fetch'
import Booking from '../../src/models/booking'
import DeciplusClient, { DeciplusBookingsResponse, DeciplusSession, DeciplusSignInResponse } from '../../src/services/deciplus'

jest.mock('node-fetch')

const { Response } = jest.requireActual('node-fetch')
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>
const dummyToken = 'dummyToken'

const dummySignInResponse: DeciplusSignInResponse = {
	tokens: {
		clubs: {
			cfstsimon: [{
				token: dummyToken
			}]
		}
	}
}

const dummyBookings: Booking[] = [
	{
		activity: 'WOD1',
		date: new Date()
	},
	{
		activity: 'WOD2',
		date: new Date()
	}
]

const dummyBookingsResponse: DeciplusBookingsResponse = {
	bookings: [
		{
			booking: {
				activity: {
					name: 'WOD1',
				},
				startDate: new Date().toISOString()
			}
		},
		{
			booking: {
				activity: {
					name: 'WOD2',
				},
				startDate: new Date().toISOString()
			}
		}
	]
}

const dummySession: DeciplusSession = {
	token: dummyToken
}

describe('deciplus service', () => {
	test('should sign-in and return a session', async () => {
		const response = new Response(JSON.stringify(dummySignInResponse))
		mockedFetch.mockResolvedValue(response)
		
		expect(await DeciplusClient.signIn('dummy', 'dummy')).toStrictEqual(dummySession)
	})

	test('should sign-in throw an error', async () => {
		const response = new Response()
	})

	test('should return a list of bookings', async () => {
		const response = new Response(JSON.stringify(dummyBookingsResponse))
		mockedFetch.mockResolvedValue(response)

		expect(await DeciplusClient.getBookings(dummySession)).toStrictEqual(dummyBookings)
	})
})
