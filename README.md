# StockOverflow

A stock portfolio management application built with [Next.js](https://nextjs.org/).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [NeonDB](https://neon.tech/)
- [TailwindCSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Clerk Auth](https://clerk.com/)

## Getting Started

- Install all the packages:

```
pnpm install
```

- Setup [NeonDB](https://neon.tech/) account and create a database
- Setup [Clerk Auth](https://clerk.com/) account and create a project
- Copy `.env.local.example` to `.env.local` and fill in the values as needed
- Run the development server:

```
pnpm dev
```

## Vercel Deployment

The easiest part out of everything here. Just click the button below and follow the instructions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Famithmkini%2Fstockoverflow%2Ftree%2Fmain&env=DRIZZLE_DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL&envDescription=Requires%20NeonDB%20and%20Clerk%20projects&envLink=https%3A%2F%2Fgithub.com%2Famithmkini%2Fstockoverflow%2Fblob%2Fmain%2F.env.local.example)
