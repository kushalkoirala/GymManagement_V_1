import {
  boolean,
  integer,
  pgTable,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

// Gym owners table
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  phone_number: varchar("phone_number", { length: 20 }),
  is_active: boolean("is_active").notNull().default(true),
});

// Gym clients table
export const clientsTable = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 20 }),
  tenant_id: integer("tenant_id")
    .notNull()
    .references(() => usersTable.id),
});
