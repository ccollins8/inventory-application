// app.js
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const gameRouter = require("./routes/gameRouter")
const genreRouter = require("./routes/genreRouter");
const developerRouter = require("./routes/developerRouter");

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter)
app.use("/genres", genreRouter);
app.use("/developers", developerRouter);
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
