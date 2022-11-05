import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../middleware/prisma";






export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID,
          clientSecret: process.env.DISCORD_SECRET
        })
      // ...add more providers here
      ],
      pages: {
        signIn: '/',
        error: '/error'
    },
    callbacks: {
        
        async jwt({token, user, account, profile, isNewUser}) {
            user && (token.user = user)
            return token
          },
      
        async session({ session, token, user }) {
          const userWithProfil = await prisma.user.findUnique({
              where: { id: Number(user.id) },
              include: {
                profil: true, lettres: true, refs: true, 
                experiences: true, diplomes: true, skills: true, projects: true, hobbies: true,
              }
            })
              
            session = {
              ...session,
              user: userWithProfil
            }
            
              return session
        }
      }
}

export default NextAuth(authOptions)