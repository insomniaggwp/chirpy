import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../custom_errors.js";

export function handlerValidateChirp(req: Request, res: Response, next: NextFunction): void {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body || {};

  try {
    if (!params.body) throw new BadRequestError("Missing 'body' field");
    if (params.body.length > 140) throw new BadRequestError("Chirp is too long. Max length is 140");

    const cleanedBody = censorProfanity(params.body);

    res.status(200).json({ cleanedBody });
  } catch (err: any) {
    // const error = {
    //   ...err,
    //   message: err.message || "Something went wrong"
    // }
    next(err)
  }
}

function censorProfanity(input: string) {
  const profaneWords = [
    'kerfuffle',
    'sharbert',
    'fornax'
  ];

  let result = input;
  for (const word of profaneWords) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, "****");
  }
  return result;
}