import express from "express";
import { connectDB } from "./lib/db.js";
import orgRoutes from "./routes/org.routes.js";
import comRoutes from "./routes/committee.route.js";
import nomineeRoutes from "./routes/register.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import applyRoute from "./routes/nominee.route.js";
import approveRoutes from './routes/approval.route.js'

const app = express();

app.use(cors(
  {
  origin: "http://localhost:5173",
  credentials: true,
}
));


const rootPath = path.join(process.env.UPLOAD_FILE_PATH, "idproof");

app.use("/inventory", express.static(rootPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json()); // Replace body-parser
// app.use(express.urlencoded({ extended: true }));

app.use("/api/organisation", orgRoutes);

app.use("/api/candidate", nomineeRoutes);

app.use("/api/committee", comRoutes);

app.use("/api/application", applyRoute);

app.use("/api/candidates",approveRoutes);
app.get("/", (req, res) => {
  res.json({ message: "nsdfivnlafjvnafliv" });
});
app.use((err, req, res, next) => {
  console.log(err.stack);

  const StatusCode = err.statusCode || 500;
  res.status(StatusCode).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server connected at ${PORT} `);
  connectDB();
});
