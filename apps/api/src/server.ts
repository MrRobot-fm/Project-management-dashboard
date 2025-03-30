import express from "express";
import { errorMiddleware } from "@/middlewares/errors";
import { rootRouter } from "@/routes/root";
import cookieParser from "cookie-parser";

export const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
