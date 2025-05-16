import express from "express";
import proverbs from "./routes/proverbs.js";
import categories from "./routes/categories.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/proverbs", proverbs);
app.use("/categories", categories);
app.use(cors());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
