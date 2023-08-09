// Get a list of portfolios, and redirect to the first one.
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

import PortfolioNav from './portfolio-nav'
import { portfolioTable } from '@/db/schema/portfolio'

import { db } from '@/lib/db'

export default function PortfolioRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  if (!userId) {
    return <div>Not logged in</div>
  }

  const portfolioList = db.query.portfolioTable.findMany({
    where: eq(portfolioTable.userId, userId),
  })

  return (
    <main>
      <PortfolioNav portfolios={portfolioList} />
      {children}
    </main>
  )
}
