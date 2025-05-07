import dotenv from "dotenv";

import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error: ", error);
  });
