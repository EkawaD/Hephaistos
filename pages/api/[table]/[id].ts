import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { loadSubscribers } from '.'
import { callSubscribers } from '../../../middleware/handlers'
import { authOptions } from '../auth/[...nextauth]'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { table, id }, method } = req

  const session = await unstable_getServerSession(req, res, authOptions)


  if (session) {
    
    loadSubscribers()
    const call = callSubscribers(table, method)
    try {
      await call(req, res, table)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error : error.toString() })
    }
  } else {
    res.status(400).json({error: "You must be authenticated to access this endpoint"})
  }

}

