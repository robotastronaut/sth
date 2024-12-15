import { getClient } from '..'
import {
  advocates,
  specialties,
  advocatesSpecialties,
  AdvocateSpecialty,
} from '../schema'
import * as gen from './advocates'

export const main = async () => {
  // How many to generate. Using 15 for now, but this could be a config option.
  const maxAdvocates = 15
  // This keeps the randomization constant for every run. It might change if/when faker is updated.
  const seed = 42
  const db = getClient()
  const advocateList = gen.generateAdvocates(seed, maxAdvocates)
  // Insert specialties first
  await db.insert(specialties).values(gen.specialties)

  // We need to keep track of the relationships as we iterate through and insert advocates
  const specialtyAdvocateRelationships: AdvocateSpecialty[] = []

  // Insert advocates. Doesn't seem that drizzle can easily insert with relationships, so we'll do it manually. I may have misread the docs and GH issues, though.
  await db.insert(advocates).values(
    advocateList.map((advocate) => {
      // Pull out the specialties and add the relationships
      specialtyAdvocateRelationships.push(
        ...advocate.specialties.map((specialty) => {
          return {
            advocateId: advocate.id,
            specialtyId: specialty.id,
          }
        })
      )

      // Don't inclue specialties in the advocate object. Those are separate.
      return {
        id: advocate.id,
        firstName: advocate.firstName,
        lastName: advocate.lastName,
        city: advocate.city,
        degree: advocate.degree,
        yearsOfExperience: advocate.yearsOfExperience,
        phoneNumber: advocate.phoneNumber,
      }
    })
  )

  // Now add the relationships because the references need to exist first.
  await db.insert(advocatesSpecialties).values(specialtyAdvocateRelationships)
  // Close the connection so we don't sit around waiting for the script to exit.
  await db.$client.end()
}

main()
