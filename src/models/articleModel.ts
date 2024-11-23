import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./userModel";
import { relations } from "drizzle-orm";

export const ArticleTable = pgTable("article", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    body: varchar("content", { length: 255 }).notNull(),
    authorId: uuid("authorId").references(() => UserTable.id, { onDelete: "cascade" }).notNull(),
});

export const ArticleTableRelations = relations(ArticleTable, ({ one }) => {
    return {
        authorId: one(UserTable, {
            fields: [ArticleTable.authorId],
            references: [UserTable.id],
        }),
    }
})