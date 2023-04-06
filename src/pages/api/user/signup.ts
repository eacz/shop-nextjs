import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { db } from '@/database'
import { User } from '@/models'
import { IUser } from '@/interfaces'
import { jwt } from '@/utils'

type Data = { message: string } | { user: IUser; token: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return signup(req, res)
    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const signup = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, password } = req.body as { email: string; password: string; name: string }
  if (!password || password.length < 6)
  return res.status(400).json({ message: 'Invalid password. Must be at least 6 characters.' })
  if (!name || name.length < 2)
  return res.status(400).json({ message: 'Invalid name. Must be at least 2 characters' })
  if (!email) return res.status(400).json({ message: 'Invalid email' })

  try {
    await db.connect()

    const user = await User.create({ name, email: email.toLowerCase(), password: bcrypt.hashSync(password, 10), role: 'client' })

    await db.disconnect()

    const token = jwt.signToken(user._id, user.email)

    user.password = undefined
    return res.status(201).json({ user, token })
  } catch (error: any) {
    if (error?.code === 11000) {
      res.status(500).json({ message: `Duplicated key ${JSON.stringify(error.keyValue)}` })
    }

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
