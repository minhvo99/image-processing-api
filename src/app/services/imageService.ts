import path from "path";
import sharp from "sharp";

export function handleImage(filename: string, width: number, height: number): Promise<Buffer> {
    let image = sharp(path.resolve(`assets/full/${filename}.jpg`));

    if (width && height) {
        image = image.resize({
            width: width,
            height: height,
        });
    }

    return image.toBuffer();
}

export function handleImagePath(filename: string, width: number, height: number): string {
    if (width && height) {
        return `assets/full/${filename}&width=${width}&height=${height}.jpg`;
    } else {
        return `assets/full/${filename}.jpg`;
    }
}
