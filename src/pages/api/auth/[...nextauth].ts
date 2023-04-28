import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { dbUser } from '@/database'

declare module 'next-auth' {
  interface User {
    _id: string
    id?: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials) {
        return await dbUser.checkUserEmailPassword(credentials!.email, credentials!.password)
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
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/register',
  },
  //TODO: fix tiping and do a further research on thiss
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.access_token = account.access_token
        switch (account.type) {
          case 'credentials':
            token.user = user
            break
          case 'oauth':
            token.user = await dbUser.OAuthToDbUSer(user.email, user.name)
            break
        }
      }
      return token
    },
    async session({ session, token, user }: any) {
      session.access_token = token.access_token
      session.user = token.user
      return session
    },
  },
}
export default NextAuth(authOptions)
