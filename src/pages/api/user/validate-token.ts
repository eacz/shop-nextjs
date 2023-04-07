import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { db } from '@/database'
import { User } from '@/models'
import { jwt } from '@/utils'

type Data = { message: string } | { token: string; user: { email: string; role: string; name: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return validateJwt(req, res)
    default:
      return res.status(404).json({ message: 'Bad Request' })
  }
}

const validateJwt = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies

  let userId = ''

  try {
    userId = await jwt.isValidToken(token)
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Jwt' })
  }

  await db.connect()
  const user = await User.findById(userId).lean()
  await db.disconnect()

  if (!user) {
    return res.status(401).json({ message: 'Invalid jwt' })
  }

  const { role, name, email, _id } = user
  const newToken = jwt.signToken(_id, email)

  return res.status(200).json({
    token: newToken,
    user: { email, role, name },
  })
}
