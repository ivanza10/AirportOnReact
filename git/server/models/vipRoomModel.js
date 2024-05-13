const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);

class VipRoom {
  static async getAllVipRooms() {
    try {
      return await knex.select("*").from("VIP_room");
    } catch (error) {
      throw error;
    }
  }

  static async createVipRoom(price, name, photo) {
    try {
      const [newVipRoom] = await knex("VIP_room").insert(
        { price, name, photo },
        "*"
      );
      return newVipRoom;
    } catch (error) {
      throw error;
    }
  }

  static async updateVipRoom(idRoom, name, price, photo) {
    try {
      await knex("VIP_room").where({ idRoom }).update({ name, price, photo });
    } catch (error) {
      throw error;
    }
}

  static async deleteVipRoom(id) {
    try {
      await knex("VIP_room").where({ idRoom: id }).del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VipRoom;
