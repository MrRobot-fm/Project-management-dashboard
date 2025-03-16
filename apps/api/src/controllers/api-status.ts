import type { Request, Response } from "express";

export const checkApiStatus = (_: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
};
