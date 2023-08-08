const express = require("express");
const expressLayouts =require('express-ejs-layouts')
const app = express();
const usersRouter = require("./routes/users");
const usersRekomendasiRouter = require("./routes/usersRekomendasi");


app.use(express.json());
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});




app.use("/users", usersRouter);
app.use("/users", usersRekomendasiRouter);


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