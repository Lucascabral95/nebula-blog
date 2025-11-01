import NextAuth from "next-auth"
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
                try {
                    const client = await UserDAO.findUserByEmail(credentials.email.toLowerCase())

                    if (!client) {
                        throw new Error("El usuario no existe")
                    }

                    const chequeoPassword = await UserDAO.validatePassword(credentials.password, client.password)

                    if (!chequeoPassword) {
                        throw new Error("El email o la contraseña son invalidos")
                    }

                    return {
                        id: client._id.toString(),
                        name: client.name,
                        email: client.email,
                        role: client.role
                    }
                } catch (error) {
                    console.error("Error en autorización:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
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
                        user.id = newUser._id.toString();
                    } else {
                        user.id = client._id.toString();
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
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/",
        signOut: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }