var proxy = require("express-http-proxy");
var app = require("express")();
const port = 3008;


app.use(
  "/generateResultExcel",
  proxy("http://localhost:3006/generateResultExcel")
);
app.use("/results/login", proxy("http://localhost:3006/login"));
app.use("/result", proxy("http://localhost:3006"));
app.use("/", proxy("http://localhost:3006"));
app.use("*", proxy("http://localhost:3006"));


app.listen(port, () => {
  console.log(`Aplication listen on ${port}`);
});
