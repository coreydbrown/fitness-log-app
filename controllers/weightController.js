import Weight from "../models/Weight.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createWeight = async (req, res) => {
  if (!req.body.weight) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  const weight = await Weight.create(req.body);

  res.status(StatusCodes.CREATED).json({ weight });
};

const getAllWeights = async (req, res) => {
  let result = Weight.find({ createdBy: req.user.userId });
  result = result.sort("-createdAt");

  const weights = await result;

  res.status(StatusCodes.OK).json({ weights });
};

export { createWeight, getAllWeights };
