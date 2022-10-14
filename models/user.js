'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
    static authenticate = async ({ username, password }) => {
      try {
      const user = await this.findOne({ where: { username }})
      if (!user) return Promise.reject("User not found!")
      const isPasswordValid = user.checkPassword(password)
      if (!isPasswordValid) return Promise.reject("Wrong password")
      return Promise.resolve(user)
      }
      catch(err) {
      return Promise.reject(err)
      }
    }  

    checkPassword = password => bcrypt.compareSync(password, this.password)

    static generateToken({ fullname , username , role }) {
      const payLoad = {
        fullname,
        username,
        role
      }

      const secretKey = process.env.SECRETNUM

      const token = jwt.sign(payLoad, secretKey)
      // console.log(payLoad);
      return token;

    }
  }

  User.init({
    fullname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    } ,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};