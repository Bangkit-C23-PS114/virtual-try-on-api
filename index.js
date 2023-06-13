const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const usersRekomendasiRouter = require("./routes/usersRekomendasi");


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.use("/users", usersRouter);
app.use("/users/rekomendasi", usersRekomendasiRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})