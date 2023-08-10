import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
    interface Session {
        access_token: string
    }
}