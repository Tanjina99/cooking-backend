const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./db/connection");
const userRoutes = require("./router/UserRouter");
const recipeRoutes = require("./router/RecipesRouter");
const blogRoutes = require("./router/BlogRouter");
const saveRoutes = require("./router/SaveItemRouter");
const port = 3000;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

dbConnection();

app.use("/api", userRoutes);
app.use("/api", recipeRoutes);
app.use("/api", blogRoutes);
app.use("/api", saveRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
