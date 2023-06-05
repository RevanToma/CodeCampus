const { DataTypes } = require("sequelize");
const sequelize = require("./../../config/sequelize");

const userSchema = {
  userId: {
    field: "user_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordHash: {
    field: "password_hash",
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = sequelize.define("users", userSchema);
