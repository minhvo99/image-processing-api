import fs from 'fs'
import express from "express";
import path from "path";
import { handleImage, handleImagePath } from "../services/imageService";
import { promises as fsPromises } from 'fs';
class ImageController {
    async fullImage(req: express.Request, res: express.Response) {
        try {
            const filename = req.query.filename as unknown as string;
            const height = parseInt(req.query.height as unknown as string);
            const width = parseInt(req.query.width as unknown as string);

            const outputImgPath: string = handleImagePath(filename, width, height);
            if (!fs.existsSync(outputImgPath)) {
            const resizedImage = await handleImage(filename, width, height);
            await fsPromises.writeFile(outputImgPath, resizedImage);
            }
            res.sendFile(path.resolve(outputImgPath));
            
        } catch (error) {
            res.send(`An error occurred: ${error}`);
        }
    }

    home(req: express.Request, res: express.Response) {
        res.send(`
        <h1>Image Processing API</h1>
      <p>Redirect to 
      <code>http://localhost:3000/api/image?filename='filename'</code> 
      and input valid file name. </p>
      <ul><h4>Valid filenames:</h4>
      <li>encenadaport</li>
      <li>fjord</li>
      <li>icelandwaterfall</li>
      <li>palmtunnel</li>
      <li>santamonica</li>
      </ul>
      <p>Examples:
      <ul>
      <li>
      <a href="/api/image?filename=fjord">/api/image?filename=fjord</a>
      </li>
      <li>
      <a href="/api/image?filename=fjord&width=300&height=500">/api/image?filename=fjord&width=300&height=500</a>
      </li>
      </ul>
      </p>`);
    }
    pageNotFound(req: express.Request, res: express.Response) {
        res.status(404).send(`<h3>404!!! Image not found</h3>`);
    }
}
export default new ImageController();
