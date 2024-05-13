const knexConfig = require('../config/knexfile');
const knex = require('knex')(knexConfig);

class KafeOrShop {
  static async getAllKafeOrShops() {
    try {
      return await knex.select('*').from('Kafe_or_Shop');
    } catch (error) {
      throw error;
    }
  }

  static async createKafeOrShop(photo, name, signature, floor, type) {
    try {
      const [newKafeOrShop] = await knex('Kafe_or_Shop').insert({ photo, name, signature, floor, type }, '*');
      return newKafeOrShop;
    } catch (error) {
      throw error;
    }
  }

  static async getKafe() {
    try {
      return await knex.select('*').from('Kafe_or_Shop').where('type', 'кафе');
    } catch (error) {
      throw error;
    }
  }

  static async getShop() {
    try {
      return await knex.select('*').from('Kafe_or_Shop').where('type', 'магазин');
    } catch (error) {
      throw error;
    }
  }

  static async updateKafeOrShop(id, photo, name, signature, floor, type) {
    try {
      await knex('Kafe_or_Shop').where('id', id).update({ photo, name, signature, floor, type });
    } catch (error) {
      throw error;
    }
}

  static async deleteKafeOrShop(id) {
    try {
      await knex('Kafe_or_Shop').where('id', id).del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = KafeOrShop;
