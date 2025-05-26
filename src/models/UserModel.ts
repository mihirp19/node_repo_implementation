import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface UserAttribs {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UserCreationAttribs extends Optional<UserAttribs, "id"> {}

export class UserModel
  extends Model<UserAttribs, UserCreationAttribs>
  implements UserAttribs
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users2",
    modelName: "UserModel",
  }
);
