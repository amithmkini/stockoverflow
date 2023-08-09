import type { Metadata, ResolvingMetadata } from 'next'
import { auth } from '@clerk/nextjs'
import { eq, and } from 'drizzle-orm'

import PortfolioNav from '../../portfolio-nav'
import { db } from '@/lib/db'
import { portfolioTable } from '@/db/schema/portfolio'

const metadata: Metadata = {
  title: 'Portfolio Settings - StockOverflow',
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
    title: portfolio.name + ' Settings - StockOverflow',
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
          <PortfolioNav portfolio={null} />
          <div className="m-4 text-xl">Portfolio not found</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="flex flex-col">
        <PortfolioNav portfolio={portfolio} settingsPage />
        <div className="m-4 text-xl">Portfolio Settings</div>
      </div>
    </main>
  )
}
