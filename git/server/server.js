require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
const session = require('express-session');
const cors = require('cors');
const flightRouter = require("./routers/flightRouter"); // Импортируем маршрут для полетов
const kafeOrShopRouter = require("./routers/KafeOrShopRouter");
const usersRouter = require("./routers/usersRouter");
const vipRoomRouter = require("./routers/vipRoomRouter");
const setCookieMiddleware = require('./middleware/middleware');
const vipUsersRouter = require("./routers/vipUsersRouter");
const PORT = process.env.PORT || 3000;
const MailService = require("./mail/mailer.service");



app.set("view engine", "ejs");

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Измените на порт фронтенда
  credentials: true // Разрешить передачу учетных данных
}));


app.use(session({
  secret: 'user_sid',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // установите secure в true, если используете HTTPS
}));
app.use(setCookieMiddleware);


app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.json());
app.use("/flight", flightRouter);
app.use(express.static('static'));
app.use("/service", kafeOrShopRouter);
app.use("/users", usersRouter);
app.use("/vipusers", vipUsersRouter);
app.use("/viproom", vipRoomRouter);
app.get("/", (req, res) => {
  res.send("Добро пожаловать на сервер!");
});

// Вызываем функцию sendWelcomeMail из модуля MailService
//MailService.sendWelcomeMail("ivan.maslakov.99@mail.ru");


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start()