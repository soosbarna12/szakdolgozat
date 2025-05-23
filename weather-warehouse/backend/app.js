const timeout = require('connect-timeout');
const express = require('express');
const cors = require("cors");
const sql = require('mssql');
const http = require('http');

const sqlConfig = {
  user: 'sa',      
  password: 'admin1234',
  server: 'localhost', 
  port: 1433,
  database: 'weather-warehouse',
  options: {
    trustServerCertificate: true,
    requestTimeout: 120000
  },
};

const hostname = '127.0.0.1';
const port = 4000;
const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// routes
const { router: forecast } = require("./src/routes/forecast");
const today = require("./src/routes/today");
const historical = require("./src/routes/historical");
const user = require("./src/routes/user");

(async function () {
  try {
    console.log("sql connecting......")
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('select * from Users');
  } catch (err) {
    console.log(err);
  }
})();

app.use("/forecast", forecast);
app.use("/today", today);
app.use("/historical", historical);
app.use("/user", user);


app.use(timeout(120000));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;