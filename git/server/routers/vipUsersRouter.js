const express = require("express");
const router = express.Router();
const VipUser = require("../models/vipUserModel");

// GET all VIP users
router.get("/", async (req, res) => {
  try {
    const vipUsers = await VipUser.getAllVipUsers();
    res.json(vipUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params; // Получаем id пользователя из параметров запроса
    const user = await VipUser.getUserById(idUser); // Предположим, что у вас есть метод getUserById в модели VipUser
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new VIP user
router.post("/", async (req, res) => {
  const { idUser, passportNumber, time, phone } = req.body;
  try {
    const newVipUser = await VipUser.createVipUser(
      idUser,
      passportNumber,
      time,
      phone
    );
    res.status(201).json(newVipUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// PUT method to update a VIP user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { passportNumber, phone } = req.body;
  try {
    await VipUser.updateVipUser(id, passportNumber, phone);
    res.status(200).json({ message: "VIP user updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE method to delete a VIP user
router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params; // Use idUser instead of id
  try {
    await VipUser.deleteVipUser(idUser); // Pass idUser to the delete function
    res.status(200).json({ message: "VIP user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }


});

module.exports = router;
