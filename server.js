const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const debug = require("debug")("mern:server");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure serve-favicon & static middleware to serve from production 'dist' folder
// app.use(favicon(path.join(__dirname, "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "dist")));
app.use(require("./config/checkToken").checkTokenMiddleware);

//note for server routes, we use /api as convention
app.get("/api", (req, res) => {
	res.json({ hello: "world" });
});

app.use("/api/users", require("./routes/api/usersRoutes"));

// The following "catch all" route (note the *) is necessary to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
