import express from "express";
import { extractWebpageText } from "../services/webpageService.js";

const router = express.Router();

router.post("/summarise", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        error: "Please provide a URL.",
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({
        error: "Please provide a valid URL.",
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        error: "Only HTTP and HTTPS URLs are supported.",
      });
    }

    const webpage = await extractWebpageText(parsedUrl.href);

    return res.status(200).json({
      message: "Webpage text extracted successfully.",
      url: parsedUrl.href,
      title: webpage.title,
      text: webpage.text,
    });

    
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return res.status(504).json({
        error: "The webpage took too long to respond.",
      });
    }

    console.error("Webpage fetch error:", error.message);

    return res.status(502).json({
      error: "Unable to fetch the webpage.",
    });
  }
});

export default router;
