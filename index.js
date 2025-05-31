const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const { connectToMongoDB } = require("./connect.js");
const URL = require("./models/url.js");

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

  // if (!entry) {
  //   return res.status(404).send("Short URL not found");
  // }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`Server started at Port : ${port}`));
