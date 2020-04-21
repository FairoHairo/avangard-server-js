import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import mysql from "mysql";
import bodyParser from "body-parser";
import config from "../../../webpack.dev.config.js";
import index from "../routers/index";
import soldiers from "../routers/soldiers";

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html"),
  compiler = webpack(config);

const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "05vereru",
  database: "avangard-db"
});

mc.connect();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/soldiers", soldiers);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
