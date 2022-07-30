const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter =  rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use(limiter)
app.use(express.static(__dirname + "/dist/fitx-workload-analyzer-ui"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/fitx-workload-analyzer-ui"));
});
app.listen(process.env.PORT || 8080);
