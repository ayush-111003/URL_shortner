const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect.js");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.use("/url", urlRoute);

app.listen(port, () => console.log(`Server started at Port : ${port}`));
