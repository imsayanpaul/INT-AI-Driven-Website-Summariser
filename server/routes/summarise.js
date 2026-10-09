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

    return res.status(200).json({
      message: "Webpage summarized successfully.",
      url: parsedUrl.href,
      title: webpage.title,
      summary,
    });
  } catch (error) {
    console.error("Summarisation error:", error);

    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return res.status(504).json({
        error: "The webpage took too long to respond.",
      });
    }

    if (error.message?.includes("Website returned HTTP")) {
      return res.status(502).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Failed to summarise the webpage. Please try again.",
    });
  }
});

export default router;
