import {boolean, integer, pgTable, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users",{
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      email: varchar({ length: 255 }).notNull().unique(),
      first_name: varchar({ length: 255 }),
      last_name: varchar({ length: 255 }),
      phone_number: varchar({ length: 20 }),  
      is_active: boolean().notNull().default(true),
})
