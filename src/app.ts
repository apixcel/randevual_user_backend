import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import errorMiddleware from "./middlewares/error";
import morgan from "morgan";
import connectDB from "./config/db";
import routes from "./routes/v1";

const app: Application = express();
app.use(cors());
app.use(morgan("dev"));

// Connect to Database
connectDB();

/*
1. secure rate limit https
2. cors proper config
3. routing name conventaion
4. regular update package
5. req.body validate
6. schema validation
7. seeders
8. logger
9. 
*/ 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use("/api/v1/", routes);

// Middleware for Errors
app.use(errorMiddleware);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});


const port: any = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(
    `App is running on port: ${port}. Run with http://localhost:${port}`
  );
});
