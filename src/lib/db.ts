import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User], // 직접 엔티티 클래스 import
  migrations: [],
  subscribers: [],
});

// 초기화 함수
export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection initialized");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
}

class Database {
  private static instance: Promise<DataSource> | null = null;

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  public static getDataSource(): Promise<DataSource> {
    if (!Database.instance) {
      const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: true,
        entities: [User],
        subscribers: [],
        migrations: [],
      });

      Database.instance = dataSource
        .initialize()
        .then((fulfilled) => {
          console.info("Data Source has been initialized!");
          return fulfilled;
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
          // Handle the error appropriately
          throw err;
        });
    }
    return Database.instance;
  }
}

export default Database;
