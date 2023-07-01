import sharp from "sharp";
import express from "express";
import path from "path";
class ImageController {
    async fullImage(req: express.Request, res: express.Response) {
        try {
            const filename = req.query.filename as unknown as string;
            const height = parseInt(req.query.height as unknown as string);
            const width = parseInt(req.query.width as unknown as string);

            if (!filename) {
                return res.status(404).send(`<h3>Missing filename parameter</h3>`);
            }

            let image = sharp(path.resolve(`assets/full/${filename}.jpg`));
            let origianlImage = sharp(path.resolve(`assets/full/${filename}.jpg`));
            const metadata = await image.metadata();
            const originalWidth = metadata.width;
            const originalHeight = metadata.height;

            let imageUrl = `http://${req.headers.host}/api/images?filename=${filename}`;
            let originalImageUrl = `http://${req.headers.host}/api/images?filename=${filename}`;

            if (width && height) {
                image = image.resize(Number(width), Number(height));
                imageUrl += `&width=${width}&height=${height}`;
            }
            res.setHeader("Content-Type", "image/jpg");
            image.pipe(res);

            if (!width && !height) {
                origianlImage = origianlImage.resize(Number(originalWidth), Number(originalHeight));
                originalImageUrl += `&width=${originalWidth}&height=${originalHeight}`;
            }
            res.setHeader("Content-Type", "image/jpg");
            origianlImage.pipe(res);
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
