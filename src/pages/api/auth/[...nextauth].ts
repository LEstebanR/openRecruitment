import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { userBelongsToCompany } from '@/utils/backend'
import { getURL } from '@/utils/dual'
import { omit } from 'lodash'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'abcd@xyz.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (credentials) {
        const user = await fetch(getURL('/api/user/check-credentials'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json',
          },
          body: Object.entries(credentials ?? [])
            .map((e) => e.join('='))
            .join('&'),
        })
          .then((res) => res.json())
          .catch((err) => {
            console.log(err)
            return null
          })

        if (user) {
          return user
        } else {
          throw new Error('Wrong credentials. Try again.')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userRole = user?.userRole
        token.image = user?.photo?.path
      }

      if (trigger === 'update' && session?.selectedCompany) {
        if (
          token.email &&
          (await userBelongsToCompany(token.email, session.selectedCompany.toString()))
        ) {
          token.selectedCompany = session.selectedCompany.toString()
        } else {
          token = omit(token, 'selectedCompany')
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: token.image ? token.image : session.user?.image,
          userRole: token.userRole,
          selectedCompany: token.selectedCompany,
        },
      }
    },
  },
}
export default NextAuth(authOptions)
