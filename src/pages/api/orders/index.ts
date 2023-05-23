import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createRouteLoader(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const createRouteLoader = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body
  console.log({ body })

  return res.status(201).json({ message: 'Test' })
}
