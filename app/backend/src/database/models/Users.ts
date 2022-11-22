import { Model, INTEGER } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: INTEGER,
    allowNull: false,
  },
  role: {
    type: INTEGER,
    allowNull: false,
  },
  email: {
    type: INTEGER,
    allowNull: false,
  },
  password: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
