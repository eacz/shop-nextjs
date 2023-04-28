import { User } from '@/models'
import { db } from '.'
import bcrypt from 'bcrypt'

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect()
  const user = await User.findOne({ email }).lean()
  await db.disconnect()

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null
  }

  const { role, name, _id } = user

  return {
    _id,
    name,
    email: email.toLowerCase(),
    role,
  }
}

export const OAuthToDbUSer = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect()
  const user = await User.findOne({ email: oAuthEmail }).lean()
  await db.disconnect()

  //case of already having an user with the same email as the oauth
  if (user) {
    await db.disconnect()
    const { _id, name, email, role } = user
    return { _id, name, email, role }
  }

  //case of being an completely new user (different email)
  const newUser = new User({ email: oAuthEmail, name: oAuthName, password: 'XD', role: 'client' })
  await newUser.save()
  await db.disconnect()
  const { role, name, _id, email } = newUser
  return { _id, name, email, role }
}
