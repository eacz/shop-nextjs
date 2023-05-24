import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { IOrder } from '@/interfaces'
import { db } from '@/database'
import { Order, Product } from '@/models'
import { authOptions } from '../auth/[...nextauth]'

type Data = { message: string } | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createRouteLoader(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const createRouteLoader = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder

  //Auth Check
  const session: any = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ message: 'Unathorized' })
  

  //Products Check
  const productsIds = orderItems.map((product) => product._id)
  await db.connect()
  const dbProducts = await Product.find({ _id: { $in: productsIds } }).lean()

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentProductPrice = dbProducts.find((prod) => String(prod._id) === current._id)?.price
      if (!currentProductPrice) throw new Error(`Please check your cart ${current.title} doesn't exists`)
      return currentProductPrice * current.quantity + prev
    }, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const backendTotal = subtotal * (taxRate + 1)

    if (total !== backendTotal) {
      throw new Error(`Total doesn't match with the view`)
    }

    //OK, create order
    const userId = session.user._id
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
    await newOrder.save()

    return res.status(201).json(newOrder)
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ message: error.message || 'Internal Server Error' })
  } finally {
    await db.disconnect()
  }
}
