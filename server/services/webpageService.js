import * as cheerio from "cheerio";

export async function extractWebpageText(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Website returned HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    throw new Error("The URL does not return an HTML webpage.");
  }

  const html = await response.text();

  const $ = cheerio.load(html);

  $("script, style, noscript, iframe, svg").remove();

  const title = $("title").text().trim() || "Untitled webpage";

  const text = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  if (!text) {
    throw new Error("No readable text was found on this webpage.");
  }

  return { title, text };
}