import express, { NextFunction, type Request, type Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";
import morgan from "morgan";
import { connectDB } from "./utils/connect";
import { errorMiddleware } from "./middleware/errorHandler";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(` REQUEST: ${req.method} ${req.url}`);
  console.log(` PATH: ${req.path}`);
  console.log(` PARAMS:`, req.params);
  console.log(` QUERY:`, req.query);
  console.log("-------------------");
  next();
});
connectDB();
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express 🚀");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(process.env.GMAIL_USER);
  console.log(process.env.GOOGLE_APP_PASSWORD);

  console.log(`Server running on http://localhost:${PORT}`);
});
