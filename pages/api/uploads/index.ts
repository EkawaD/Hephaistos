import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs, readFile } from "fs";
import path from "path";
import formidable, { File } from 'formidable';


/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
        responseLimit: "10mb",
    }
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => { });
    }).catch(e => {
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

    if (files) {
        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/public/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;
            // await fs.rename(tempPath, targetPath + file[1].originalFilename);
            readFile(tempPath, (err, data) => {

                // Write the file
                fs.writeFile(targetPath + file[1].originalFilename, data);

                // Delete the file
                fs.unlink(tempPath);
            });
        }
    }

    res.status(status).json(resultBody);
}

export default handler;