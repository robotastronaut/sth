'use client'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'

import { FilterInput } from './advocates'

// I wanted it to feel less like a floating table and input, so I created a header to house the filter input.
// Also, I snagged the Solace logo from the svg path on the Solace website just to tie it together a bit.
export default function Header() {
  // HeadlessUI has a nice disclosure element that can be used for headers, but I'm not actually doing much with it here other than showing
  // that it exists.
  return (
    <Disclosure
      as="nav"
      className="border-b border-opal-dark bg-opal-transparent"
    >
      <div className="max-w-full mx-4">
        <div className="flex h-16 justify-left">
          <div className="flex shrink-0 items-center">
            <Image
              src="/solace.svg"
              alt="Solace logo"
              width={20}
              height={20}
              className="hidden h-8 w-auto sm:block lg:block"
            />
          </div>
          <div className="ml-4 flex items-center">
            <FilterInput />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
