import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface OrderAttributes {
  id: string;
  userId: string;
  status: "pending" | "shipped" | "delivered";
  totalAmount: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export class OrderModel
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public userId!: string;
  public status!: "pending" | "shipped" | "delivered";
  public totalAmount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user2",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "OrderModel",
  }
);
