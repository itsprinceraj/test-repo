import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import { dbConnect } from "./services/database.service";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

dbConnect();
// default route
app.get("/", (req, res) => {
  res.json({
    message: `App is running on PORT: ${PORT}`,
  });
});

// configure router
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
