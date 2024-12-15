'use client'

import Header from '@/app/header'
import { AdvocateList } from './advocates'

// This doesn't have a whole lot going on anymore. I absolutely could have put pretty much everything into this one component and used state rather than context,
// but that would have been long, require prop drilling, and would be a pain to test.
export default function Home() {
  return (
    <main>
      <Header />
      <AdvocateList />
    </main>
  )
}
