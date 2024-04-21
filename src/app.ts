import express from "express";
import cors from "cors";
import http from "http";
import errorMiddleware from "./middlewares/error";
import morgan from "morgan";
import connectDB from "./config/db";
import routes from './routes/v1';

const app = express();
app.use(cors());
app.use(morgan("dev"));

// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

// Middleware for Errors
app.use(errorMiddleware);

app.use("/api",routes);

const port: any = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`App is running on port: ${port}. Run with http://localhost:${port}`);
});