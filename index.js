import express from "express";

const app = express();

// Middlewares follow the "Chain of Responsibility" pattern

// Global Middleware: only parses JSON requests
app.use(express.json());

// Global Middleware: triggers error
app.use((req, res, next) => {
  console.log("will run before any route");
  try {
    throw new Error("failing here!");
  } catch (err) {
    next(err);
  }
});

// Global Middleware: error handler
app.use((err, req, res, next) => {
  console.log("something goes wrong");
  res.status(500).send(err.message);
});

// Route-based Middleware
app.use("/users", (req, res, next) => {
  console.log("will run before users route");
  next();
});

app.get("/", (req, res) => {
  console.log("route / called");
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  console.log("route /users called");
  res.send("Hello users!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
