let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  if (process.env['MESSAGE_STYLE'] == "uppercase") {
    res.json({"message": "HELLO json".toUpperCase()});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get(
  "/:word/echo",
  (req, res) => {
    res.send({"echo": req.params.word});
  }
);

app.get(
  "/name",
  (req, res) => {
    res.send({name: req.query.first + " " + req.query.last});
  }
);

app.post(
  "/name",
  (req, res) => {
    console.log(req);
    res.send({name: req.body.first + " " + req.body.last});
  }
);


module.exports = app;
