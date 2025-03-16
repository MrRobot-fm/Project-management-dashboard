import express from "express";
import { rootRouter } from "@/routes/root";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);
console.log("ciao");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
