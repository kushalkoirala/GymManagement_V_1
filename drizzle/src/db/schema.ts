import {
  boolean,
  integer,
  pgTable,
  varchar,
  serial,
  timestamp,
  pgEnum
} from "drizzle-orm/pg-core";

/* User roles */
export const userRoleEnum = pgEnum("user_role", [
  "SUPER_ADMIN",
  "GYM_OWNER",
  "GYM_STAFF",
]);

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  phone_number: varchar("phone_number", { length: 20 }),
  role: userRoleEnum("role").notNull(),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
});


export const gymsTable = pgTable("gyms", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  owner_id: integer("owner_id")
    .references(() => usersTable.id)
    .notNull(),

  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const clientsTable = pgTable("clients", {
  id: serial("id").primaryKey(),

  gym_id: integer("gym_id")
    .notNull()
    .references(() => gymsTable.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 20 }),

  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
});