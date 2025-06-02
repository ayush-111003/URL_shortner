const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allurls = await URL.find({});
    console.log("Route accessed");
    return res.render("home", {
      urls: allurls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.render("home", {
      urls: [],
      error: "Failed to fetch URLs",
    });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
