const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const setCookieMiddleware = require('../middleware/middleware');
const MailService = require('../mail/mailer.service');
router.use(setCookieMiddleware);

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    user_type
  } = req.body;
  try {
    const newUser = await User.createUser(name, email, password, user_type);
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// POST for user registration
router.post("/register", async (req, res) => {
  const { name, email, password, user_type } = req.body;
  try {
    const userExists = await User.findUserByEmail(email);
    if (userExists) {
      return res.status(409).json({
        message: "Пользователь с такой почтой уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.registerUser(name, email, hashedPassword, user_type);

    // Попытка отправить приветственное письмо
    try {
      await MailService.sendWelcomeMail(email, name);
      console.log(`Welcome email sent to ${email}`);
    } catch (mailError) {
      console.error(`Error sending welcome email to ${email}:`, mailError);
    }

    req.session.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Ошибка регистрации",
    });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.loginUser(email, password);
      req.session.user = {
          id: user.idUser,
          name: user.name,
          email: user.email,
          user_type: user.user_type
      };

      res.json({
          id: user.idUser,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          // Другие данные, которые вы хотите отправить на клиент
      });
  } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({
          message: "Неверный email или пароль"
      });
  }
});

router.get("/profile", (req, res) => {
  // Проверка наличия данных пользователя в сессии
  if (req.session.user) {
    // Отправляем данные пользователя в ответе
    res.json(req.session.user);
  } else {
    // Если пользователь не аутентифицирован, отправляем ошибку 401 (Unauthorized)
    res.status(401).json({ message: "Пользователь не аутентифицирован" });
  }
});




// PUT method to update a user
router.put("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    email,
    password,
    user_type
  } = req.body;
  try {
    await User.updateUser(id, name, email, password, user_type);
    res.status(200).json({
      message: "User updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// DELETE method to delete a user
router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await User.deleteUser(id);
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post("/logout", (req, res) => {
  // Удаляем данные пользователя из сессии
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ message: "Ошибка при выходе из системы" });
    } else {
      // Успешный выход из аккаунта
      res.json({ message: "Выход из системы успешно выполнен" });
    }
  });
});

module.exports = router;
