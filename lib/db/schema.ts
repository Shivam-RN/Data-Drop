import {pgTable, text, uuid, integer, boolean , timestamp} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';


export const files = pgTable("files", {
 
  // Unique identifier for the file/folder
  id: uuid("id").defaultRandom().primaryKey(),

  // Basic file/folder information
  name: text("name").notNull(),
  path: text("path").notNull(), 
  size: integer("size").notNull(), 
  type: text("type").notNull(),

  // Storage information
  fileUrl: text("file_url").notNull(), 
  thumbnailUrl: text("thumbnail_url"),

  // Ownership
  userId: text("user_id").notNull(), 
  parentId: uuid("parent_id"), 

  // File/Folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(), 
  isTrash: boolean("is_trash").default(false).notNull(), 

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const filesRelations = relations(files,({one , many}) => ({
     parent: one(files, {
     fields: [files.parentId], // The foreign key in this table
     references: [files.id], // The primary key in the parent table
  }),
  children: many(files),
}))

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
