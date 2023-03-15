import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'

type Data =
  | {
      message: string
    }
  | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)
    default:
      res.status(400).json({ message: 'Not found' })
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query

  if (!slug || (typeof slug === 'string' && slug.trim() === '')) {
    return res.status(400).json({ message: 'Invalid slug' })
  }

  await db.connect()

  const product = await Product.findOne({ slug }).lean()

  if (!product) {
    return res.status(404).json({ message: `There is no product with slug ${slug}` })
  }

  return res.status(200).json(product)
}
