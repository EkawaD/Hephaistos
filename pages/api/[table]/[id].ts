import type { NextApiRequest, NextApiResponse } from 'next'
import { loadSubscribers } from '.'
import { callSubscribers } from '../../../middleware/handlers'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { table, id }, method } = req

  // const session = await unstable_getServerSession(req, res, authOptions)
  // const user = session.user as GuildMember
  // const isMember = user.isMember
  if (id) {
    loadSubscribers()
    const call = callSubscribers(table, method)
    try {
      await call(req, res, table)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error : error.toString() })
    }
  } else {
    res.status(401).json({error: "You must be authenticated to access this ressource"})
  }
  res.end()

}

