const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();

  // Set expiration date (7 days from now)
  const expiresInDays = 7;
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
  // const expiresAt = new Date(Date.now() + 1 * 60 * 1000);//for testing purposes, set to 1 minute

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    expiresAt: expiresAt,
    createdBy: req.user._id, // Assuming req.user is set by the auth middleware
  });

  return res.render("home", {
    id: shortId,
    redirectURL: body.url,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
