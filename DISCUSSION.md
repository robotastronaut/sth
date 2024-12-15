# DISCUSSION

## Project config, tooling, etc

- [x] Update outdated modules where possible. Most deprecation warnings seem to come from outdated eslint, but moving from 8->9 is a can of worms for existing projects, so there may not be time. It does seem that Vercel updated `eslint-config-next` to be in line with the new flat file config loader.
- [x] dotenv
- [x] tsx
- [x] improve environment config, docker compose, etc. Need better secrets handling.
- [ ] Etc?

## Frontend

### Hard Errors

- [x] `src/app/page.tsx` - List items without key
- [x] Bad table formatting -- `th` needs `tr`
- [x] Search calls string function on number

### Standards, Linting, etc

- [ ] No type definitions. I added some, but I could spend a lot more time here.
- [x] using `document.getElementById().innerHTML` to set a value
- [x] Inline style objects lead to unmaintainable projects
- [ ] Tests! Didn't have time.

### Improvements

- [x] move to `useSWR`
- [x] It's pretty ugly. Make it less so. Snag heroicons or FA? HeadlessUI? Probably. (I marked this done, but it might still be ugly.)
- [x] Shamelessly steal Solace logo?
- [x] Break a few things out into their own components for better styling, state management, etc.
- [x] Filter is very basic. Improve that. (Still mostly basic, but it's a bit better. Might break somewhere.)
- [x] Request to `advocates` currently fires twice. Moving to `useSWR`, so this should go away.
- [ ] Accessibility should be prioritized, given the purpose.
- [x] Debounce filter
- [ ] More tests!

## Backend

- [x] Don't create a db connection when `src/db/index.ts` is first loaded. Hairy. Becomes difficult to test. Allow it to be a singleton but let it be returned from a function call
- [x] Will this be serverless? DB connection implications. Pooling, proxies, etc.
- [x] Phone number shouldnt be stored in the db as a bigint. Either text, text with a constraint, a domain, or pull in a lib. Leading zeroes.
- [ ] Abstract data layer with interface. Provide implementations for both db- and memory-backed data layer
- [x] Define transport layer type to decouple db schema from frontend
- [x] postgres.js as the underlying driver uses prepared statements, which cause problems when using RDS. Use `prepare: false`
- [x] Use `node-postgres`. Better types (IMO) and pooling. Doesn't pin an RDS Proxy session like postgres.js does.
- [x] Normalize specializations a bit. Might take too much time and overcomplicate a super tiny app like this, but if I'm being forward-thinking, it would be great to have a straightforward way to query for advocates by specialization
- [x] Better seeding. Use Faker with a seed so that it can be tested if we want.
- [x] Infer drizzle types with `InferSelectModel`
- [ ] Improve env/config handling (This is partially done with dotenv, but it could be way better)
- [ ] More tests!
