import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

import { portfolioTable } from '@/db/schema/portfolio'
import { db } from '@/lib/db'
import { slugify } from '@/lib/utils'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl)
  const { userId } = auth()
  if (!userId) {
    const loginUrl =
      requestUrl.origin +
      (process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/login')
    return NextResponse.redirect(loginUrl)
  }

  const portfolios = await db
    .select()
    .from(portfolioTable)
    .where(eq(portfolioTable.userId, userId))
  return NextResponse.json(portfolios)
}

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl)
  const { userId } = auth()
  if (!userId) {
    const loginUrl =
      requestUrl.origin +
      (process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/login')
    return NextResponse.redirect(loginUrl, { status: 301 })
  }

  // You get only the name of the portfolio.
  const body = await request.json()
  if (!body) {
    return NextResponse.json({ error: 'No body' }, { status: 400 })
  }

  const name = body.name
  const slug = slugify(name)

  // Check for duplicate portfolio slug and userId (because we don't trust the client code)
  const dupPortfolio = await db
    .select()
    .from(portfolioTable)
    .where(
      and(eq(portfolioTable.slug, slug), eq(portfolioTable.userId, userId)),
    )
  if (dupPortfolio.length > 0) {
    return NextResponse.json({ error: 'Duplicate portfolio' }, { status: 400 })
  }

  // Not checking for collisions, because let's be honest, it's not going to happen.
  let portfolioId = uuidv4()
  // Create the portfolio.
  const portfolio = await db
    .insert(portfolioTable)
    .values({
      id: portfolioId,
      name: name,
      slug: slug,
      userId: userId,
    })
    .returning()

  return NextResponse.json(portfolio)
}
