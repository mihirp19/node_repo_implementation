import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface RefTokenAttribs {
  id: string;
  token: string;
  userId: string;
}

export interface RefTokenCreation extends Optional<RefTokenAttribs, "id"> {}

export class RefreshTokenModel
  extends Model<RefTokenAttribs, RefTokenCreation>
  implements RefTokenAttribs
{
  public id!: string;
  public token!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RefreshTokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users2",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "reftoken2",
    modelName: "RefreshTokenModel",
  }
);
