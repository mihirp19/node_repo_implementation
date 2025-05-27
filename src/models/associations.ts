import { ProductModel } from "./ProductModel";
import { ItemModel } from "./ItemModel";
import { UserModel } from "./UserModel";
import { OrderModel } from "./OrderModel";

export const associateModels = () => {
  UserModel.hasMany(OrderModel, { foreignKey: "userId" });
  OrderModel.belongsTo(UserModel, { foreignKey: "userId" });

  OrderModel.hasMany(ItemModel, { foreignKey: "orderId" });
  ItemModel.belongsTo(OrderModel, { foreignKey: "orderId" });

  ProductModel.hasMany(ItemModel, { foreignKey: "productId" });
  ItemModel.belongsTo(ProductModel, { foreignKey: "productId" });
};
