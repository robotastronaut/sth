import { getClient } from '@/db'

// DTO type
export type Advocate = {
  id: string
  firstName: string
  lastName: string
  city: string
  degree: string
  yearsOfExperience: number
  phoneNumber: string
  specialties: string[]
}

export async function GET() {
  const db = getClient()
  // use the query builder with relationships rather than joins. Cleaner.
  const data = await db.query.advocates.findMany({
    with: {
      advocatesSpecialties: {
        with: {
          specialty: true,
        },
      },
    },
  })

  // Map the data to the DTO. Comes back with an ugly nesting because of the drizzle relationships.
  // Also keeping the ID on here for now because it's useful for the frontend in the short term.
  return Response.json(
    data.map((advocate) => ({
      id: advocate.id,
      firstName: advocate.firstName,
      lastName: advocate.lastName,
      city: advocate.city,
      degree: advocate.degree,
      yearsOfExperience: advocate.yearsOfExperience,
      phoneNumber: advocate.phoneNumber,
      specialties: advocate.advocatesSpecialties.map(
        ({ specialty }) => specialty.name
      ),
    }))
  )
}
