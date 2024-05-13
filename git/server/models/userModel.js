const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);
const bcrypt = require('bcrypt');

class User {
  static async loginUser(email, password) {
    try {
      const user = await knex('Users').where({ email }).first();
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findUserByEmail(email) {
    try {
      const user = await knex('Users').where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async registerUser(name, email, password, user_type) {
    try {
      const [newUser] = await knex('Users').insert({ name, email, password, user_type }, '*');
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await knex.select("*").from("Users");
    } catch (error) {
      throw error;
    }
  }

  static async createUser(name, email, password, user_type) {
    try {
      const [newUser] = await knex("Users").insert(
        { name, email, password, user_type },
        "*"
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(idUser, name, email, password, user_type) {
    try {
      await knex("Users")
        .where({ idUser })
        .update({ name, email, password, user_type });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(idUser) {
    try {
      await knex("Users").where({ idUser }).del();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
