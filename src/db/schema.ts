import { sql, InferSelectModel, relations } from 'drizzle-orm'
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core'

// many-to-many relationship configured as per the docs at https://orm.drizzle.team/docs/relations#many-to-many

export const advocates = pgTable('advocates', {
  id: uuid('id').defaultRandom().primaryKey(), // UUID keys give us better predictability right now, and better testing because we aren't dependent upon insertion order.
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  city: text('city').notNull(),
  degree: text('degree').notNull(),
  yearsOfExperience: integer('years_of_experience').notNull(),
  // NOT adding a check here because it's non-trivial to validate phone numbers when they're from all over the world
  phoneNumber: text('phone_number').notNull(),
  // Conversation required regarding timezones.
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
})

// Set up the many-to-many relationships from the perspective of the advocates table
export const advocatesRelations = relations(advocates, ({ many }) => ({
  advocatesSpecialties: many(advocatesSpecialties),
}))

export const specialties = pgTable('specialties', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
})

export const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocatesSpecialties: many(advocatesSpecialties),
}))

export const advocatesSpecialties = pgTable(
  'advocates_specialties',
  {
    advocateId: uuid('advocate_id')
      .notNull()
      .references(() => advocates.id),
    specialtyId: uuid('specialty_id')
      .notNull()
      .references(() => specialties.id),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
    },
  ]
)

// Each item in the advocatesSpecialties table represents a single specialty that an advocate has.
export const advocatesSpecialtiesRelations = relations(
  advocatesSpecialties,
  ({ one }) => ({
    advocate: one(advocates, {
      fields: [advocatesSpecialties.advocateId],
      references: [advocates.id],
    }),
    specialty: one(specialties, {
      fields: [advocatesSpecialties.specialtyId],
      references: [specialties.id],
    }),
  })
)

// I want types for these. Since we aren't inserting, really, we can just use the select model.
export type Advocate = InferSelectModel<typeof advocates>
export type Specialty = InferSelectModel<typeof specialties>
export type AdvocateSpecialty = InferSelectModel<typeof advocatesSpecialties>

// To use drizzle to its full capacity, we need to bundle all of our tables and relations into a single schema object.
// This is what we'll pass to drizzle when we create the database, and it will let us use more expressive relationship syntax rather than relying on joins.
export const schema = {
  advocates,
  advocatesRelations,
  specialties,
  specialtiesRelations,
  advocatesSpecialties,
  advocatesSpecialtiesRelations,
}
