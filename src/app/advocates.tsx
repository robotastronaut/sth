'use client'
import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/16/solid'
import { UserCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import useSWRImmutable from 'swr/immutable'
import debounce from 'lodash.debounce'
import { Advocate } from './api/advocates/route'

export type FilterContext = {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

export const FilterCtx = createContext<FilterContext | null>(null)

export function AdvocateFilterProvider({ children }: PropsWithChildren) {
  const [filter, setFilter] = useState('')
  return (
    <FilterCtx.Provider value={{ filter, setFilter }}>
      {children}
    </FilterCtx.Provider>
  )
}

// Making a better looking filter input.

export function FilterInput() {
  // This isn't going to be a controlled input, so we don't actually need to subscribe to the filter value.
  const { setFilter } = useContext(FilterCtx) as FilterContext
  // It's not controlled, so create a ref to allow us to clear the input.
  const input = useRef<HTMLInputElement>(null)

  // Need a change handler
  const handleChange = () => {
    setFilter(input.current?.value || '')
  }

  // We want to debounce this, but we don't want to create a new debounced function every render, so memoize it.
  // It's worth noting that Next uses react strict mode by default, so things like this get called twice to help check for side effects.
  // It can be turned off in the next config file.
  const debouncedHandleChange = useMemo(() => debounce(handleChange, 300), [])

  // Because debounce delays the execution of the function, we need to make sure it's cleaned up when the component is unmounted or it might fire afterward.
  useEffect(() => {
    return () => {
      // Lodash debounce has a cancel method, so leverage it
      debouncedHandleChange.cancel()
    }
  }, [])

  // Handle clearing the input
  const handleClear = () => {
    if (input?.current) {
      input.current.value = ''
      setFilter('')
    }
  }

  // Make it pretty with a heroicon and colors absolutely stolen from Solace's css.
  return (
    <div>
      <div className="mt-2 grid grid-cols-2">
        <input
          ref={input}
          defaultValue=""
          id="filter"
          name="filter"
          type="text"
          placeholder="Filter advocates..."
          onChange={debouncedHandleChange}
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-black outline outline-1 -outline-offset-1 outline-opal-dark placeholder:text-opal-dark focus:outline focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
        />
        <button
          type="button"
          className="col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-primary-default"
          onClick={handleClear}
        >
          <XMarkIcon />
        </button>
      </div>
    </div>
  )
}

// SWR Fetcher
const fetcher = (url: string) => fetch(url).then((r) => r.json())

// We need a better list.
export function AdvocateList() {
  // Get the filter value from context
  const { filter } = useContext(FilterCtx) as FilterContext
  // Use SWR to fetch the advocates. We're using immutable because we don't need to mutate the data and don't want it constantly refreshing.
  const { data, isLoading, isValidating } = useSWRImmutable<Advocate[]>(
    'api/advocates',
    fetcher
  )

  // Filter the advocates based on the filter value and memoize it.
  const advocates: Advocate[] = useMemo(() => {
    if (!data) return []
    return data.filter((advocate: Advocate) => {
      // Smash all of the searchable fields together in a single string and check if the filter is in there. Use lowercase for filter and the fields.
      const desc =
        `${advocate.firstName} ${advocate.lastName} ${advocate.city} ${advocate.degree} ${advocate.phoneNumber} ${advocate.specialties.join(' ')}`.toLowerCase()
      return desc.includes(filter.toLowerCase())
    })
  }, [filter, data])
  // If we're loading or validating, don't show the table. Instead, show a needlessly animated spinner and loading message.
  if (isLoading || isValidating)
    return (
      <div className="flex items-center justify-start font-semibold text-primary-default mx-4 my-4">
        <Cog6ToothIcon className="animate-spin size-6 mr-2" />
        Loading...
      </div>
    )

  // TODO: Show a message if there are no advocates. Show a message if there is an error. Show a message if the filter doesn't match any advocates.
  // Show the table. Using an unordered list rather than a table because we're showing healthcare advocates to people, and we want warmth.
  // TODO: Make this accessible. `aria-label`, `role`, etc. Users more likely than others to use accessibility tools.
  return (
    <ul role="list" className="divide-y divide-opal-dim">
      {/** Map the advocates to list items */}
      {advocates.map((advocate: Advocate) => (
        <li
          key={advocate.id}
          className="flex justify-between gap-x-6 py-5 hover:bg-opal-light cursor-pointer"
        >
          {/** Added some hover styling to the li. Also making the name and icon have a flex basis of 1/3. Looks better. */}
          <div className="flex gap-x-4 shrink-0 basis-1/3">
            {/** Using a placeholder icon here to represent what could be a headshot */}
            <UserCircleIcon className="size-16 text-opal-mid self-center" />
            {/** Only putting the name, title, location, and YOE here with lighter text so that specializations aren't crowded. */}
            <div className="flex-auto">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {advocate.firstName} {advocate.lastName}, {advocate.degree}
              </p>
              <p className="text-sm text-gray-500">{advocate.phoneNumber}</p>
              <p className="text-sm text-gray-500">{advocate.city}</p>
              <p className="text-sm text-gray-500">
                {advocate.yearsOfExperience} years of experience
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 basis-2/3">
            <div className="flex-auto">
              {/** Specialties are important, so they're getting a little more space, but I'm not actually convinced that this is the best way to do it. Revisit later. */}
              <p className="text-sm text-gray-500">Specialties</p>
              {advocate.specialties.map((specialty) => (
                // In a later refactor, I would like to use something else for the key.
                <p key={specialty} className="my-1 text-xs ">
                  {specialty}
                </p>
              ))}
            </div>
            {/** A chevron to call users to click to learn more, but I'm not adding that for this exercise. */}
            <ChevronRightIcon className="size-6 text-opal-mid self-center flex-none" />
          </div>
        </li>
      ))}
    </ul>
  )
}
