import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials)

        return {name: 'Esteban', email: 'estebanacanteros@gmail.com', role: 'admin'}
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  //Deprecated
  //jwt: {
  //  secret: process.env.SECRET_KEY,
  //}, 
  callbacks: {
    
  }
}
export default NextAuth(authOptions)
