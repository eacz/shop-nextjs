import jwt from 'jsonwebtoken'

export const signToken = (id: string, email: string) => {
  if (!process.env.SECRET_KEY) {
    throw new Error('missing SECRET_KEY. check env vars')
  }
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.SECRET_KEY) {
    throw new Error('missing SECRET_KEY. check env vars')
  }
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEY || '', (err, payload) => {
        if (err) return reject('Invalid Jwt')
        const { id } = payload as { id: string }
        resolve(id)
      })
    } catch (error) {
      return reject('Invalid Jwt')
    }
  })
}
