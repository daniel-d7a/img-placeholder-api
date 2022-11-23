import express from "express";
import { promises as fs } from "fs";
import sharp from "sharp";
import path from "path";

import { resizeImg } from "./functions";

const app = express();
const port = 8080;

//TODO: use the path module

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "views")));

app.get("/images", async (req: express.Request, res: express.Response) => {
  const FULL_IMG_PATH = "src\\images\\full";
  const THUMB_IMG_PATH = "src\\images\\thumb";

  const imgName = req.query.name as unknown as string;
  const imgWidth = req.query.width as unknown as string;
  const imgHeight = req.query.height as unknown as string;

  if (!imgName) return;
  if (!imgWidth) return;
  if (!imgHeight) return;

  try {
    const images = await fs.readdir(FULL_IMG_PATH);
    const fullName = images.find((fileName) => {
      return fileName.startsWith(imgName);
    });

    //if img exists
    if (fullName) {
      //if img exists as thumb
      const thumbs = await fs.readdir(THUMB_IMG_PATH);
      const thumbName = thumbs.find((fileName) => {
        return fileName.startsWith(imgName);
      });

      if (!thumbName) {
        const ext = fullName.slice(-3);
        resizeImg(imgName, imgWidth, imgHeight, ext);
      }

      res.render("home", {
        link: req.url,
        width: imgWidth,
        height: imgHeight,
      });
    } else {
      res.send("file not found!");
    }
  } catch (err) {
    console.log("err1");
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
