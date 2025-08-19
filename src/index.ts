import express, { NextFunction, type Request, type Response } from "express";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";
import morgan from "morgan";
import { connectDB } from "./utils/connect";
import { errorMiddleware } from "./middleware/errorHandler";
import Order from "./models/order.model";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(` REQUEST: ${req.method} ${req.url}`);
//   console.log(` PATH: ${req.path}`);
//   console.log(` PARAMS:`, req.params);
//   console.log(` QUERY:`, req.query);
//   console.log("-------------------");
//   next();
// });
connectDB();
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/get-orders", async (req, res) => {
  const orders = await Order.find({}).populate({
    path: "orderItem",
    populate: "product",
  });
  return res.status(200).json(orders);
});
app.use(errorMiddleware);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
