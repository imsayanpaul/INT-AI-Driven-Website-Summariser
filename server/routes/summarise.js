import express from "express";
import { extractWebpageText } from "../services/webpageService.js";
import { generateSummary } from "../services/aiService.js";

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

    const summary = await generateSummary(webpage.text);

    res.json({ url: parsedUrl.href, title: webpage.title, summary });
  } catch (err) {
    console.error(err);

    if (err.name === "TimeoutError") {
      return res.status(504).json({ error: "That page took too long to load." });
    }

    res.status(500).json({ error: err.message || "Couldn't summarise that page." });
  }
});

export default router;
