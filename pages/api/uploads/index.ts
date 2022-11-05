import nextConnect from 'next-connect';
import fs from 'fs';
import { upload, NextConnectApiRequest, outputFolderName, ResponseData } from '../../../middleware/multer';
import { NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';


const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


apiRoute.use(upload.array('theFiles'));


apiRoute.post(async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {

    const filenames = fs.readdirSync(outputFolderName);
    const images = filenames.map((name) => name);
    res.status(200).json({ data: images });
  } else {
    res.status(400).json({error: "You must be authenticated to access this endpoint"})
  }
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;