import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

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

            Database.instance = dataSource.initialize()
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
