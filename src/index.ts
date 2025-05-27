import app from "./server";
import { sequelize } from "./config/db";
import { associateModels } from "./models/associations";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("database connected successfully");

    associateModels();

    await sequelize.sync({ alter: true });

    console.log("database synced");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect DB", error);
    process.exit(1);
  }
}
startServer();
