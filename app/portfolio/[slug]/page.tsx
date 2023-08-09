import type { Metadata } from "next"
import { auth } from '@clerk/nextjs'
import { eq, and } from "drizzle-orm";

import PortfolioNav from "../portfolio-nav"
import { db } from "@/lib/db"
import { portfolioTable } from "@/db/schema/portfolio"

export const metadata: Metadata = {
  title: "Portfolio - StockOverflow",
  description: "Portfolio page of StockOverflow",
};

export default async function Portfolio({ params }: { params: { slug: string } }) {
  const { userId } = auth()
  if (!userId) {
    return <div>Not logged in</div>
  }
  // Given slug and userId, find the portfolio ID
  const portfolio = await db.query.portfolioTable.findFirst({
    where: and(
      eq(portfolioTable.slug, params.slug),
      eq(portfolioTable.userId, userId)
    )
  })

  if (!portfolio) {
    return <div>Portfolio not found</div>
  }

  return (
    <main>
      <div className="flex flex-col">
        <PortfolioNav portfolio={portfolio}/>
        YOU ARE ON PORTFOLIO {portfolio.id}, and your user id is {userId}
      </div>
    </main>
  );
}
