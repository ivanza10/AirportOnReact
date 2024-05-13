const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);

class VipUser {
  static async getAllVipUsers() {
    try {
      return await knex.select("*").from("VIP_users");
    } catch (error) {
      throw error;
    }
  }
  

  static async getUserById(idUser) {
    try {
      const user = await knex("VIP_users").where({ idUser }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }



  static async createVipUser(idUser, passportNumber, time, phone) {
    try {
      const adjustedTime = new Date(time); // Создаем объект Date из переданного времени

      if (isNaN(adjustedTime.getTime())) {
        throw new Error("Invalid time format"); // Проверяем, была ли корректно распознана дата
      }

      adjustedTime.setHours(adjustedTime.getHours() + 3); // Добавляем 3 часа к времени

      const [newVipUser] = await knex("VIP_users").insert(
        { idUser, passportNumber, time: adjustedTime.toUTCString(), phone }, // Преобразуем скорректированное время в строку UTC
        "*"
      );
      return newVipUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateVipUser(id, passportNumber, phone) {
    try {
      await knex("VIP_users").where({ idRoom: id }).update({ passportNumber, phone });
    } catch (error) {
      throw error;
    }
  }

  static async deleteVipUser(idUser) {
    try {
      await knex("VIP_users").where({ idUser }).del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VipUser;
