import type { NextApiRequest, NextApiResponse } from 'next'

import { IProduct } from '@/interfaces'
import { db } from '@/database'
import { Product } from '@/models'

type Data =
  | {
      message: string
    }
  | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res)
    default:
      res.status(400).json({ message: 'Not found' })
  }
}
const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { query = '' } = req.query
  if (query.length === 0) {
    return res.status(400).json({ message: 'Invalid query' })
  }
  query = query.toString().toLowerCase()
  await db.connect()

  const products = await Product.find({
    $text: { $search: query },
  }).select('title images price inStock slug -_id').lean()

  await db.disconnect()
  res.status(200).json(products)
}
