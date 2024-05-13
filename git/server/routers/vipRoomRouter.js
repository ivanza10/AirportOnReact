const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "static/" });
const VipRoom = require("../models/vipRoomModel");
const uuid = require("uuid");
const path = require("path");

// GET all VIP rooms
router.get("/", async (req, res) => {
  try {
    const vipRooms = await VipRoom.getAllVipRooms();
    res.json(vipRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new VIP room
router.post("/", upload.single("photo"), async (req, res) => {
  const { price, name } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileName = uuid.v4() + ".jpg";
  fs.renameSync(file.path, `static/${fileName}`);
  try {
    const newVipRoom = await VipRoom.createVipRoom(price, name, fileName);
    const imageURL = `${req.protocol}://${req.get("host")}/static/${fileName}`;
    return res.json({ newVipRoom, imageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT method to update a VIP room
router.put("/:id", upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const photo = req.file; // получаем информацию о загруженном файле
  if (!photo || !name || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    // сохраняем фотографию в папку static
    const fileName = uuid.v4() + ".jpg";
    const newPath = path.join(__dirname, '../static', fileName);
    fs.renameSync(photo.path, newPath);
    await VipRoom.updateVipRoom(id, name, price, fileName); // передаем только имя файла
    res.status(200).json({ message: "VIP room updated successfully", fileName: fileName }); // возвращаем имя файла
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE method to delete a VIP room
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await VipRoom.deleteVipRoom(id);
    res.status(200).json({ message: "VIP room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
