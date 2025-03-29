import express from "express";
import { errorMiddleware } from "@/middlewares/errors";
import { rootRouter } from "@/routes/root";

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
