import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials)
        return { id: '1', name: 'Esteban', email: 'estebanacanteros@gmail.com', role: 'admin' }
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
            //TODO: create or check if the user exists

            break
        }
      }
      return token
    },
    async session({ session, token, user }: any) {
      console.log({ session, token, user })
      session.access_token = token.access_token
      session.user = token.user
      return session
    },
  },
}
export default NextAuth(authOptions)
