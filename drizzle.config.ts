import {defineConfig} from "drizzle-kit";

export default defineConfig({
    schema: "./src/models",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    driver: "pglite",
    dbCredentials:{
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true
});