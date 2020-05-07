import express from "express";
import { cardController } from "../controllers/card.controllers";

const cardRoutes = express.Router();

//get all
cardRoutes.get("/", cardController.findAll);
//create new
cardRoutes.post("/", cardController.create);
//get one by id
cardRoutes.get("/:id", cardController.findOne);
//update one by id
cardRoutes.put("/:id", cardController.update);
//delete one by id
cardRoutes.delete("/:id", cardController.delete);

export default cardRoutes;
