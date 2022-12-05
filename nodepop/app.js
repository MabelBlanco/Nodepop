var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authMiddleware = require("./modules/authMiddleware");

var indexRouter = require("./routes/index");
const changeLocaleRouter = require("./routes/changeLocale");
const loginRouter = require("./routes/login");
const userProfileRouter = require("./routes/userProfile");

const advertisementsRouter = require("./routes/api/advertisements");
const tagsRouter = require("./routes/api/tags");

const i18n = require("./modules/i18nConfig");

var app = express();

app.locals.appName = "Nodepop";

require("./modules/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(
    `Se ha recibido una petición de tipo ${req.method} a la ruta ${req.path}`
  );
  next();
});

app.use(i18n.init);

//WEBSITE ROUTES
app.use(
  session({
    name: "nodepop-session",
    secret: "-@kFnl[]I9|Ff:.",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // the cookie expires after 1 day to inactivity
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use((req, res, next) => {
  // With this middleware, we can access session at views
  res.locals.session = req.session;
  next();
});

app.use("/", indexRouter);
app.use("/changeLocale", changeLocaleRouter);
app.use("/login", loginRouter);
app.use("/userProfile", authMiddleware, userProfileRouter);

// API ROUTES
app.use("/api/advertisements", advertisementsRouter);
app.use("/api/tags", tagsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  // if is a request for API
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

module.exports = app;
