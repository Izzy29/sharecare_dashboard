import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { UserAd } from "./lib/model";
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        connectToDB();
        const user = await UserAd.findOne({ username: credentials.username });

        if (!user) throw new Error("User not exist!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) throw new Error("Password is incorrect!");

        return user;
    } catch (err) {
        throw new Error("Failed to login!");
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.img = user.img;
                token.position = user.position
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name;
                session.user.img = token.img;
                session.user.position = token.position;
            }
            return session;
        },
    },
});