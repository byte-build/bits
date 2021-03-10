import firebase from './firebase'
import getImage from './image'

interface Bit {
	name: string
	bits: number
	cost: number
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bits: Record<string, Bit> = require('../data/bits.json')

const firestore = firebase.firestore()
const storage = firebase.storage().bucket()

export const removeBits = async () => {
	const newBits = Object.keys(bits)
	const { docs: oldBits } = await firestore.collection('bits').get()

	await Promise.all(
		oldBits
			.filter(({ id }) => !newBits.includes(id))
			.map(({ ref }) => ref.delete())
	)
}

export const updateBits = async () => {
	await Promise.all(
		Object.entries(bits).map(async ([id, data]) => {
			const image = await getImage(id)

			await Promise.all([
				firestore.doc(`bits/${id}`).set(data),
				storage.file(`bits/${id}`).save(image.data, {
					public: true,
					gzip: true,
					metadata: {
						contentType: image.type,
						contentDisposition: `inline; filename=${JSON.stringify(data.name)}`,
						cacheControl: 'public, max-age=31536000, s-maxage=31536000'
					}
				})
			])
		})
	)
}
