const express = require ('express');
const cors = require("cors");

const hostname = '127.0.0.1';
const port = 4000;
const app = express();

const forecast = require("./src/routes/forecast");
const today = require("./src/routes/today");
const historical = require("./src/routes/historical");
const user = require("./src/routes/user");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/forecast", forecast);
app.use("/today", today);
app.use("/historical", historical);
app.use("/user", user);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;