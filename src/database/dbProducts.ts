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
