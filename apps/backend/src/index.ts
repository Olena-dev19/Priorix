import express from "express";
import cors from "cors";
import taskRouter from "./features/tasks/task.router";
import { errorMiddleware } from "./middleware/error";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

app.use("/api/tasks", taskRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
