import {drizzle}  from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import "dotenv/config";

const migrationClient = postgres(process.env.DATABASE_URL as string,{max:1});
migrate(drizzle(migrationClient),{
    migrationsFolder: "./drizzle/migrations",
}).then(()=>{
    migrationClient.end();
});