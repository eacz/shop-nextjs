import { Product } from '@/models'
import { db } from '@/database'
import { IProduct } from '../interfaces/product'

{
}
export const getProductBySlug = async (slug: String): Promise<IProduct | null> => {
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  if (!product) {
    return null
  }

  return JSON.parse(JSON.stringify(product))
}

interface ProductSlug {
  slug: string
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect()

  return slugs
}
