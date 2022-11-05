import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { subscribeToApi, callSubscribers } from '../../../middleware/handlers'
import { prisma } from '../../../middleware/prisma'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { query: { table }, method } = req
  // const session = await unstable_getServerSession(req, res, authOptions)
  
  
  // const user = session.user as GuildMember
  // const isMember = user.isMember


    const custumMethod = method === "GET" ? "ALL" : "POST"
    loadSubscribers()
    const call = callSubscribers(table, custumMethod)
    try {
      await call(req, res, table)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : error.toString() })
    }
   
  


 
}



export const loadSubscribers = () => {

  subscribeToApi("user", "ALL",
    async (req: NextApiRequest, res: NextApiResponse) => {
      const users = await prisma.user.findMany({ include: { posts: true } })
      res.status(200).json(users)
    })
  subscribeToApi("user", "GET",
    async (req: NextApiRequest, res: NextApiResponse) => {
      const { query: { table, id }, method } = req
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          profil: true, lettres: true, refs: true, todos: true,
          experiences: true, diplomes: true, skills: true, projects: true, hobbies: true,
          mealPlans: true, recipes: true,
        }
      })
      res.status(200).json(user)
    })
}


