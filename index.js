import express from "express";
import puppeteer, { Page } from "puppeteer";
import dotenv from "dotenv";
import cors from "cors";
import { archiHTML, interiorHTML } from "./html.js";
dotenv.config();
const PORT = 8080;
const app = express();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.use(
  cors({
    origin: "*",
  })
);

app.get("/screenshot", async (req, res) => {
  const { name, niche } = req.query;
  let page;
  let browser;
  console.log(`Name: ${name}, Niche: ${niche}`);
  const architecthtml = archiHTML(name);
  const interiorHtml = interiorHTML(name);
  try {
    if (!browser) {
      browser = await puppeteer.launch({
        timeout: 180000,

        args: [`--no-sandbox`],
      });
      console.log("Puppeteer is up and running");
    }
    page = await browser.newPage();
    console.log("New page opened");
    await page.setViewport({ width: 1440, height: 950 });
    page.setDefaultNavigationTimeout(60000);
    if (niche.includes("architecture")) {
      page.setContent(architecthtml);
    } else if (niche.includes("interior")) {
      page.setContent(interiorHtml);
    }
    console.log("HTML set!");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    const screenshot = await page.screenshot({
      encoding: "base64",
      fullpage: true,
    });
    console.log("Screenshot taken");
    res.json({ src: screenshot }).status(200);
  } catch (error) {
    console.error(error);
    res.send({ error }).status(500);
  } finally {
    await page.close();
  }
});
