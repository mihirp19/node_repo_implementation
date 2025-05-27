// ItemId, OrderId(ForeignKey OrderModel), ProductId(ProductModel), Qty, Price, TotalPrice
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface ItemAttribs {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface ItemCreation extends Optional<ItemAttribs, "id"> {}

export class ItemModel
  extends Model<ItemAttribs, ItemCreation>
  implements ItemAttribs
{
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  public totalPrice!: number;
}

ItemModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "items",
    modelName: "ItemModel",
    timestamps: true,
  }
);
