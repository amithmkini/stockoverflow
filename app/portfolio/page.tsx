import { redirect } from 'next/navigation'

import { Portfolio } from '@/db/schema/portfolio'
import { getPortfolios } from '@/app/actions'

export const runtime = 'edge'

async function getPortfolio() {
  const portfolio = await getPortfolios()
  if (portfolio[0]) {
    redirect(`/portfolio/${portfolio[0]}`)
  } else {
    redirect(`/portfolio/new`)
  }
}

export default async function Portfolio() {
  await getPortfolio()
}
