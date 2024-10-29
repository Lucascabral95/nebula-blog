import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import UserDAO from "@/DAO/UserDAO.jsx"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Lucas@hotmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const client = await UserDAO.findUserByEmail(credentials.email.toLowerCase())

                if (!client) {
                    throw new Error("El usuario no existe")
                }

                const chequeoPassword = await UserDAO.validatePassword(credentials.password, client.password)

                if (!chequeoPassword) {
                    throw new Error("El email o la contraseña son invalidos")
                }

                return client
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    const client = await UserDAO.findUserByEmail(profile.email);

                    if (!client) {
                        // Crear un nuevo usuario
                        const newUser = await UserDAO.createUser({
                            name: profile.name,
                            email: profile.email,
                            avatar: profile.picture,
                            role: "author"
                        });
                        user._id = newUser._id;
                    } else {
                        user._id = client._id;
                    }

                } catch (error) {
                    console.error("Error al manejar el inicio de sesión:", error);
                    return false; 
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.saludo = "Hola Developer Beginner";
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return process.env.REDIRECCION_ACCESO
        }
    },
    pages: {
        signIn: "/",
        signOut: "/",
    },
})

export { handler as GET, handler as POST }