import jwt from 'jsonwebtoken'

export const signToken = (id: string, email: string) => {
  if (!process.env.SECRET_KEY) {
    throw new Error('missing SECRET_KEY. check env vars')
  }
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1d' })
}
