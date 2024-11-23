import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { ArticleTable } from "./articleModel";

export const UserTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique()
});

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
    return {
        articles: many(ArticleTable)
    }
});