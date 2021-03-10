import glob from 'glob'
import { readFile } from 'fs'
import { getType } from 'mime'

const getImage = async (id: string) => {
	const [path] = await new Promise<string[]>((resolve, reject) => {
		glob(`images/${id}.*`, (error, paths) => {
			error ? reject(error) : resolve(paths)
		})
	})
	if (!path) throw new Error(`Missing image for item ${id}`)

	const type = getType(path)
	if (!type) throw new Error(`Unknown image type for item ${id}`)

	const data = await new Promise<Buffer>((resolve, reject) => {
		readFile(path, (error, data) => {
			error ? reject(error) : resolve(data)
		})
	})

	return { type, data }
}

export default getImage
