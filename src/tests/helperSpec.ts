import * as helpers from "../helpers";
import { promises as fs } from "fs";

describe("testing helper function", () => {
	it("test if the output image is correct", async () => {
		try {
			await helpers.resizeImg("img", 500, 600, "png");
		} catch (err) {
			console.log(err);
		}

		const images = await fs.readdir(helpers.THUMB_IMG_PATH);
		expect(images).toContain("img_500_600.png");
	});
});
