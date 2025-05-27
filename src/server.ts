import express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import itemRouter from "./routes/itemRoutes";
import orderRouter from "./routes/orderRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/items", itemRouter);

export default app;
