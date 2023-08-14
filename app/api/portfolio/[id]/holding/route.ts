import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'

import { portfolioTable } from '@/db/schema/portfolio'
import { holdingTable } from '@/db/schema/holding'
import { db } from '@/lib/db'

export const runtime = 'edge'

interface HoldingParams {
  id: string
}

// Given a portfolio id, return the portfolio and its holdings
export async function GET(
  request: NextRequest,
  { params }: { params: HoldingParams },
) {
  const requestUrl = new URL(request.nextUrl)
  const { userId } = auth()
  if (!userId) {
    const loginUrl =
      requestUrl.origin +
      (process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/login')
    return NextResponse.redirect(loginUrl)
  }

  // Get the portfolio id from the URL
  const portfolioId = params.id

  // Get the portfolio
  const portfolio = await db
    .select()
    .from(portfolioTable)
    .where(
      and(
        eq(portfolioTable.id, portfolioId),
        eq(portfolioTable.userId, userId),
      ),
    )

  // If the portfolio doesn't exist, return a 404
  if (portfolio.length === 0) {
    return NextResponse.next()
  }

  // Get the holdings for the portfolio
  const holdings = await db
    .select()
    .from(holdingTable)
    .where(eq(holdingTable.portfolioId, portfolioId))

  // Return the portfolio and holdings
  return NextResponse.json({ portfolio: portfolio[0], holdings })
}
