import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Product } from '../../models'

type Data = {
  ok: boolean
  message: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const env = process.env.NODE_ENV
    if (env !== 'development') {
      res.status(401).json({ ok: false, message: 'Not allowed to do this.' })
    }
    await db.connect()

    await Product.deleteMany({})
    await Product.insertMany(seedData.initialData.products)

    await db.disconnect()

    res.status(200).json({ ok: true, message: 'Seed executed' })
  } catch (error) {
    console.log({ error })
    //TODO: handle db errors
    res.status(500).json({ ok: false, message: 'Something went wrong' })

  }
}
