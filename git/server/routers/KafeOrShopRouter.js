const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "static/" }); // Папка, куда будут сохраняться загруженные файлы
const KafeOrShop = require("../models/kafeOrShopModel");
const uuid = require("uuid");
const path = require('path');


// GET all Kafe or Shop
router.get("/", async (req, res) => {
  try {
    const kafeOrShops = await KafeOrShop.getAllKafeOrShops();
    res.json(kafeOrShops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET Kafe
router.get("/kafe", async (req, res) => {
  try {
    const kafe = await KafeOrShop.getKafe();
    res.json(kafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET Shop
router.get("/shop", async (req, res) => {
  try {
    const shop = await KafeOrShop.getShop();
    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", upload.single("photo"), async (req, res) => {
  const { name, floor, type, signature } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  let fileName = uuid.v4() + ".jpg";
  fs.renameSync(file.path, `static/${fileName}`);
  try {
    const kafe = await KafeOrShop.createKafeOrShop(
      fileName,
      name,
      signature,
      floor,
      type
    );
    // Собираем полный URL изображения
    const imageURL = `${req.protocol}://${req.get("host")}/static/${fileName}`;
    return res.json({ kafe, imageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT method
router.put("/:id", upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, signature, floor, type } = req.body;
  const photo = req.file; // получаем информацию о загруженном файле

  if (!photo || !name || !signature || !floor || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // сохраняем фотографию в папку static
    const fileName = uuid.v4() + ".jpg";
    const newPath = path.join(__dirname, '../static', fileName);
    fs.renameSync(photo.path, newPath);

    await KafeOrShop.updateKafeOrShop(id, fileName, name, signature, floor, type);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});




// DELETE method
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await KafeOrShop.deleteKafeOrShop(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
