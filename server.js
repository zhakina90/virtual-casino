// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");


// const LocalStrategy = requirez("passport-local").Strategy;
// const mysql = require("mysql");
// var PORT = process.env.PORT || 3008;
// var db = require("./models");
// MySQL DB Connection Information (remember to change this with our specific credentials)
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 8889,
//   user: "root",
//   password: "root",
//   database: "login_system"
// });

// const passport = require("./config/passport");
const LocalStrategy = require("passport-local").Strategy;
// const mysql = require("mysql");
// var PORT = process.env.PORT || PORT;
// var db = require("./models");

// const app = express();
// // var db = connection;
// const apiroutes = require("./controllers/routes/apirouter")(app);
// const html = require("./controllers/routes/html")(app);


// // // bodyparser middleware
// // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// // app.use(cors());

// // app.use(cookieParser());

// //public or static folders

// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );


// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "virtual casino", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);

  });
});
