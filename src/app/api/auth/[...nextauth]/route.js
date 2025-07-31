import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "text", placeholder: "Enter email" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials, req) {
                console.log('credentials', credentials);
                try {
                    const userCollection = await dbConnect(collectionNameObj.userCollection)
                    const user = await userCollection.findOne({ email: credentials.email })
                    console.log('credentials user', user);
                    if (!user) {
                        throw new Error('No user found')
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) throw new Error('Password is incorrect')

                    // If no error and we have user data, return it
                    if (user) {
                        return {
                            id: user._id.toString(),
                            name: user.name || null,
                            email: user.email,
                            role: user.role,
                        }
                    }
                    // Return null if user data could not be retrieved
                    return { success: false }
                } catch (error) {
                    console.log('authentication error');
                    throw new Error('authentication error')
                }
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET
        // })
    ],
    pages: {
        signIn: '/pages/userAuthentication/loginForm',
        error: '/pages/userAuthentication/loginForm?=1'
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log('create admin', token, user);
            if (user) {
                token.id = token.user
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.role = token.role
            console.log('session ', session, token);
            return session
        }
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }