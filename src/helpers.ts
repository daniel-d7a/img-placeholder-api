import sharp from "sharp";
import path from "path";

// pathes to the full and thumb image folders
export const FULL_IMG_PATH = path.join(__dirname, "..\\images\\full");
export const THUMB_IMG_PATH = path.join(__dirname, "..\\images\\thumb");

console.log(FULL_IMG_PATH);

export async function resizeImg(
	imgName: string,
	imgWidth: number,
	imgHeight: number,
	ext: string
): Promise<void> {
	console.log("resizing image");

	try {
		//resizes the image from the full file and outputs it to the thumb file
		await sharp(path.join(FULL_IMG_PATH, `${imgName}.${ext}`))
			.resize(imgWidth, imgHeight)
			.toFile(
				path.join(THUMB_IMG_PATH, `${imgName}_thumb.${ext}`)
			);
	} catch (err) {
		console.log("err2");
		console.log(err);
	}
}
