import { config as dotenv } from 'dotenv'

dotenv()

export const handler = () => {
	if (!process.env.DECIPLUS_EMAIL || !process.env.DECIPLUS_PASSWORD) {
		throw new Error('Deciplus credentials must be provided as env variables')
	}
}
