import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../middleware/prisma'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req

    if (method !== "GET") res.end(`Method ${method} not allowed`)
    else {
        try {
            const profil = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: {
                    profil: true, lettres: true, refs: true,
                    experiences: true, diplomes: true, skills: true,
                    projects: true, hobbies: true
                }
            })
            res.status(200).json(profil)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error : error.toString() })
        }

    }

   


}

