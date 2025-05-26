import express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

export default app;
