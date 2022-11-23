import sharp from "sharp";

const FULL_IMG_PATH = "src\\images\\full";
const THUMB_IMG_PATH = "src\\images\\thumb";

export async function resizeImg(
  imgName: string,
  imgWidth: string,
  imgHeight: string,
  ext: string
) {

  
  try {
    await sharp(`${FULL_IMG_PATH}\\${imgName}.${ext}`)
      .resize(parseInt(imgWidth, 10), parseInt(imgHeight, 10))
      .toFile(`${THUMB_IMG_PATH}\\${imgName}_thumb.${ext}`);

    //TODO: make it send the thumb if thumb exists
  } catch (err) {
    console.log("err2");
    console.log(err);
  }
}
