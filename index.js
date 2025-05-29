import express from "express";

const app = express();
const port = 8001;

//routes
//return the shortend url
app.get("/:id", (req, res) => {});

//redirection to the original
app.post("/url", (res, req) => {});

//returns the clicks for the porvided url
app.get("url/analytics/:id", (req, res) => {});

app.listen(port, () => console.log(`Server started at Port : ${port}`));
