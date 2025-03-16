import { Router } from "express";
import { checkApiStatus } from "@/controllers/api-status";

export const apiStatusRouter = Router();

apiStatusRouter.get("/status", checkApiStatus);
