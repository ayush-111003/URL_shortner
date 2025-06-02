const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect.js");
const URL = require("./models/url.js");

const urlRoute = require("./routes/url.js");
const staticRoute = require("./routes/static.js");
const userRoute = require("./routes/user.js");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  if (entry.expiresAt && entry.expiresAt < new Date()) {
    return res.status(410).send("This short URL has expired.");
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`Server started at Port : ${port}`));
