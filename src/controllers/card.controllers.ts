import Card from "../models/card.model";
import { Request, Response } from "express";

export class cardController {
  // Retrieve all stored business cards
  public static findAll = (req: Request, res: Response) => {
    Card.find()
      .then((cards) => {
        res.send(cards);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Something went wrong while getting list of business cards.",
        });
      });
  };

  // Create a new business card
  public static create = (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Error: Empty request",
      });
    }
    const card = new Card({
      name: req.body.name,
      surName: req.body.surName,
      telephone: req.body.telephone,
      email: req.body.email,
      image: req.body.image,
    });
    card
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Something went wrong while creating new business card.",
        });
      });
  };

  // Get business card by id
  public static findOne = (req: Request, res: Response) => {
    Card.findById(req.params.id)
      .then((card) => {
        if (!card) {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        return res.status(500).send({
          message: `Error getting card with id ${req.params.id}`,
        });
      });
  };

  // Update business card by id
  public static update = (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Error: Empty request",
      });
    }
    // let buf = undefined;
    // if (req.body.image && req.body.image.data) {
    //   buf = Buffer.from(JSON.stringify(req.body.image.data.data));
    // }
    Card.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        surName: req.body.surName,
        telephone: req.body.telephone,
        email: req.body.email,
        image: {
          data: req.body.image.data,
          contentType: req.body.image.contentType,
        },
      },
      { new: true }
    )
      .then((card) => {
        if (!card) {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        return res.status(500).send({
          message: `Error updating business card with id ${req.params.id}`,
        });
      });
  };

  // Delete a business card by id
  public static delete = (req: Request, res: Response) => {
    Card.findByIdAndRemove(req.params.id)
      .then((card) => {
        if (!card) {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        res.send({ message: "Card successfully deleted" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: `Card with id ${req.params.id} not found`,
          });
        }
        return res.status(500).send({
          message: `Could not delete card with id ${req.params.id}`,
        });
      });
  };
}
