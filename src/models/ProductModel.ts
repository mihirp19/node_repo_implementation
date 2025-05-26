import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/db";

interface ProductAttribs {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductCreationAttribs extends Optional<ProductAttribs, "id"> {}

export class ProductModel
  extends Model<ProductAttribs, ProductCreationAttribs>
  implements ProductAttribs
{
  public id!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "ProductModel",
  }
);
