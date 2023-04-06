import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { db } from '@/database'
import { User } from '@/models'
import { jwt } from '@/utils'

type Data = { message: string } | { token: string; user: { email: string; role: string; name: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return login(req, res)
    default:
      return res.status(404).json({ message: 'Bad Request' })
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body as { email: string; password: string }
  if (!email) return res.status(400).json({ message: 'Invalid email' })
  if (!password) return res.status(400).json({ message: 'Invalid password' })

  await db.connect()
  const user = await User.findOne({ email }).lean()
  await db.disconnect()

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const token = jwt.signToken(user._id, user.email)

  const { role, name } = user
  return res.status(200).json({
    token,
    user: { email, role, name },
  })
}
