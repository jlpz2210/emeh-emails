import NextAuth, { Account, Profile, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from 'next-auth/providers/google'

interface JWTProps {
    token: JWT
    account: Account | null
}

interface SessionProps {
    session: Session
    user: User
    token: JWT
}

interface SignInProps {
    user: User
    account: Account | null
    profile?: Profile | undefined
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: 'openid https://www.googleapis.com/auth/gmail.send'
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, account}: JWTProps) {
            if(account) {
                token.access_token = account.access_token
            }
            return token
        },
        async session({session,user, token}: SessionProps) {
            session.access_token = token.access_token
            return session
        }
    }
}

export default NextAuth(authOptions)