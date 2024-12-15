import { faker } from '@faker-js/faker'

/**
 * We will be using faker with a seed to ensure consitency and flexibility. Each run should
 * generate the same data, but we can change the seed to generate a different set when needed.
 */

// Static UUIDs for specialties to ensure consistency across seeding operations
export const specialties = [
  { id: '480923ee-9763-42ab-896d-511bb687b7a2', name: 'Bipolar' },
  { id: '66181094-dfb0-4e52-85c8-944f7d6d5592', name: 'LGBTQ' },
  {
    id: '0fbd6add-bb43-46ec-8c61-8a113c952967',
    name: 'Medication/Prescribing',
  },
  {
    id: 'e23af731-45d7-44c2-a140-b5edf6b37434',
    name: 'Suicide History/Attempts',
  },
  {
    id: '0f381fec-9d44-427c-aa34-4f836b7257e7',
    name: 'General Mental Health (anxiety, depression, stress, grief, life transitions)',
  },
  { id: '1d39811d-8e68-433a-a7bd-f5aa9cb6c81d', name: "Men's issues" },
  {
    id: 'b9cfbafd-18e7-4028-b9fd-60096b307192',
    name: 'Relationship Issues (family, friends, couple, etc)',
  },
  { id: '4ffcb9ab-54a0-4dff-870c-42105b6327d2', name: 'Trauma & PTSD' },
  { id: 'c1eae60a-0537-4391-bae9-5576e8e360d9', name: 'Personality disorders' },
  { id: '49661cc2-0a0c-468f-8f64-5e1219f95b3c', name: 'Personal growth' },
  { id: '4cfab15c-2315-4ffa-bd43-5c532d2d67af', name: 'Substance use/abuse' },
  { id: '5959eb5f-eb0c-4244-b789-9344af8a04a7', name: 'Pediatrics' },
  {
    id: '75af5076-b470-4991-b1b2-5bb558d13df2',
    name: "Women's issues (post-partum, infertility, family planning)",
  },
  { id: 'bbe94518-4bea-4bb3-af81-60de29b1c023', name: 'Chronic pain' },
  {
    id: '50db355d-e4a6-416a-8887-fd379f3e1891',
    name: 'Weight loss & nutrition',
  },
  { id: 'ba5f4433-d622-4759-8ed0-0019db4957db', name: 'Eating disorders' },
  {
    id: 'a96b65d8-f161-4f8d-a674-e05a4e47dcc2',
    name: 'Diabetic Diet and nutrition',
  },
  {
    id: 'd053e7f6-f191-4d36-9a8b-2f2b676b5855',
    name: 'Coaching (leadership, career, academic and wellness)',
  },
  { id: 'c6bc4db4-8f3c-4aba-b76a-dd333209408c', name: 'Life coaching' },
  {
    id: '13b40c20-8969-4c76-b3a1-0c58b02fddd0',
    name: 'Obsessive-compulsive disorders',
  },
  {
    id: '6e3feabb-c650-411e-88c1-2533ea5961d5',
    name: 'Neuropsychological evaluations & testing (ADHD testing)',
  },
  {
    id: '88cd36f9-e0c8-45da-ada1-231d4fb35ae8',
    name: 'Attention and Hyperactivity (ADHD)',
  },
  { id: '8e613962-5b22-4ae2-9ee6-06aace4118a1', name: 'Sleep issues' },
  {
    id: 'ef336679-2fe9-4bdd-83ad-2c8acac00214',
    name: 'Schizophrenia and psychotic disorders',
  },
  { id: '4499508a-ce61-4734-8026-ae113c819e42', name: 'Learning disorders' },
  { id: 'e2d7da11-0efb-4748-82ea-448dad55a13a', name: 'Domestic abuse' },
]

// Just using the degrees and cities from the intial seed file. VSCode multi-cursor find and edit.

export const degrees = ['MD', 'PhD', 'MSW']

export const cities = [
  'Austin',
  'Chicago',
  'Columbus',
  'Dallas',
  'Fort Worth',
  'Houston',
  'Jacksonville',
  'Los Angeles',
  'New York',
  'Philadelphia',
  'Phoenix',
  'San Antonio',
  'San Diego',
  'San Francisco',
  'San Jose',
]

export const randomAdvocate = () => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.helpers.arrayElement(cities),
    degree: faker.helpers.arrayElement(degrees),
    // Pick at least one and up to three specialties
    specialties: faker.helpers.arrayElements(specialties, { min: 1, max: 3 }),
    // Honestly, this could be 1-whatever, but having it at least 2 means
    // I don't need to add any special handling for frontend stuff right now
    yearsOfExperience: faker.number.int({ min: 3, max: 15 }),
    phoneNumber: faker.phone.number(),
  }
}

// Generate a set of advocates with a seed and a max number of advocates.
export const generateAdvocates = (seed: number, maxAdvocates: number) => {
  faker.seed(seed)
  const advocates = Array.from({ length: maxAdvocates }, () => randomAdvocate())
  return advocates
}
