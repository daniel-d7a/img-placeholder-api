import express from "express";
import { promises as fs } from "fs";
import path from "path";

// importing resize image, full and thumb images path
import { resizeImg, FULL_IMG_PATH, THUMB_IMG_PATH } from "./helpers";

//initializing the express app
const app = express();
const port = 8080;

interface Query {
	name: string;
	width: number;
	height: number;
}

// the single route in the app
app.get(
	"/images",
	async (req: express.Request, res: express.Response): Promise<void> => {
		// getting the query parameters
		const {
			name: imgName,
			width: imgWidth,
			height: imgHeight,
		} = req.query as unknown as Query;
		// console.log({ imgName, imgWidth, imgHeight });

		// if any of the parameters is not found return
		if (!imgName) return;
		if (!imgWidth) return;
		if (!imgHeight) return;

		try {
			// reads the full images
			const images = await fs.readdir(FULL_IMG_PATH);

			// finds the image that the user requested
			const fullName = images.find((fileName) => {
				return fileName.startsWith(imgName);
			});

			//if the image exists
			if (fullName) {
				// check for its thumb
				//read all thumbs
				const thumbs = await fs.readdir(THUMB_IMG_PATH);
				//check for the thumb the user requested
				const thumbName = thumbs.find((fileName) => {
					return fileName.startsWith(imgName);
				});

				// get the file extension
				const ext = fullName.slice(-3);

				//if the thumb was not found
				if (!thumbName) {
					//create the thumb with the proper size and extension
					try {
						await resizeImg(imgName, imgWidth, imgHeight, ext);
					} catch (err) {
						res.status(500).send(err);
					}
				}

				//return the thumb
				res.status(200).sendFile(
					path.join(THUMB_IMG_PATH, `${imgName}_thumb.${ext}`)
				);
				// if the image was not found
			} else {
				//tell the user
				res.status(404).send("file not found!");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
