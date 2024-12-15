## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

### Database set up

Copy the `.env.example` file to `.env` and uncomment the fields. You should change the username and password. The `docker-compose.yml` file is configured to read `.env`, so the database will be set up with those credentials.

1. Spin up the database in the background. It should create the database and user.

```bash
docker compose up -d
```

2. Run the database migrations

```bash
npx drizzle-kit migrate
```

OR

```bash
npm run migrate:up
```

3. Seed the database. If you want a different dataset or more advocates, change the `seed` and `maxAdvocates` values found in `./src/db/seed/index.ts` to whatever you want. A given seed value should generate reproducable results on each run, which means that if you attempt to seed twice without wiping out the data, you will get primary key conflicts on every insert.

```bash
npm run seed
```

### Run the development server

Run the development server:

```bash
npm run dev
```
