import type { Metadata, ResolvingMetadata } from 'next'
import { auth } from '@clerk/nextjs'
import { eq, and } from 'drizzle-orm'

import { db } from '@/lib/db'
import { portfolioTable } from '@/db/schema/portfolio'

const metadata: Metadata = {
  title: 'Portfolio - StockOverflow',
  description: 'Portfolio page of StockOverflow',
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // read route params
  const { userId } = auth()
  if (!userId) {
    return metadata
  }
  // Given slug and userId, find the portfolio ID
  const portfolio = await db.query.portfolioTable.findFirst({
    where: and(
      eq(portfolioTable.slug, params.slug),
      eq(portfolioTable.userId, userId),
    ),
  })

  if (!portfolio) {
    return metadata
  }

  return {
    title: portfolio.name + ' - StockOverflow',
    description: 'Portfolio page of StockOverflow',
  }
}

export default async function Portfolio({
  params,
}: {
  params: { slug: string }
}) {
  const { userId } = auth()
  if (!userId) {
    return <div>Not logged in</div>
  }
  // Given slug and userId, find the portfolio ID
  const portfolio = await db.query.portfolioTable.findFirst({
    where: and(
      eq(portfolioTable.slug, params.slug),
      eq(portfolioTable.userId, userId),
    ),
  })

  if (!portfolio) {
    return (
      <main>
        <div className="flex flex-col">
          <div className="m-4 text-xl">Portfolio not found</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="flex flex-col">
        YOU ARE ON PORTFOLIO {portfolio.id}, and your user id is {userId}
      </div>
    </main>
  )
}
