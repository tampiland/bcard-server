import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dbConfig from "../config/db.config";
import cardRoutes from "./routes/card.routes";

const port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.use(cors({ origin: "http://localhost:3000" }));
app.options("*", cors());
app.get("/", (req, res) => {
  res.json({ message: "I'm alive" });
});
app.use("/api/cards", cardRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
