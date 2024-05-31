const express = require("express");
const app = express();

app.use(express.static("public")); // uses the public folder for static files
let rand = Math.floor(Math.random() * (3100 - 3000 + 1)) + 3000; 
app.listen(3000);

