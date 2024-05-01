import { client } from '@/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

const urlFor = (source: any) => builder.image(source)

export { urlFor }
