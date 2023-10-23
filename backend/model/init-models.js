import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _item from "./item.js";
import _users from "./users.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NM,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const item = _item.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  item.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(item, { as: "items", foreignKey: "user_id" });

  return {
    item,
    users,
  };
}
const models = initModels(sequelize);
export default models;
export { sequelize };
