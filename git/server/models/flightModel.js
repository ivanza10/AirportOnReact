const knexConfig = require('../config/knexfile');
const knex = require('knex')(knexConfig);

class Flight {
  static async getAllFlights() {
    try {
      return await knex('Flights').select('*');
    } catch (error) {
      throw error;
    }
  }

  static async getFlightsByType(type) {
    try {
      return await knex('Flights').where('type', type);
    } catch (error) {
      throw error;
    }
  }

  static async createFlight(time, direction, aviaComp, terminal, type) {
    try {
      const [newFlight] = await knex('Flights').insert({ time, direction, aviaComp, terminal, type }, '*');
      return newFlight;
    } catch (error) {
      throw error;
    }
  }

  static async updateFlight(id, time, direction, aviaComp, terminal, type) {
    try {
      await knex('Flights').where('id', id).update({ time, direction, aviaComp, terminal, type });
      return { id, time, direction, aviaComp, terminal, type };
    } catch (error) {
      throw error;
    }
  }

  static async deleteFlight(id) {
    try {
      await knex('Flights').where('id', id).del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Flight;
