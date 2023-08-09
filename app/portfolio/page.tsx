// Get a list of portfolios, and redirect to the first one.
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import { PortfolioNavLoading } from './portfolio-nav'
import { Portfolio } from '@/db/schema/portfolio'

export default function Portfolio() {
  const { push } = useRouter()
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [firstPortfolio, setFirstPortfolio] = useState<Portfolio | null>(null)

  useEffect(() => {
    // Fetch the portfolios and set them to the local state
    const loadData = async () => {
      const data = await fetch("/api/portfolio").then((res) => res.json());
      setPortfolios(data);
      setFirstPortfolio(data[0])
    }

    loadData();
  }, []);

  useEffect(() => {
    if (firstPortfolio) {
      push(`/portfolio/${firstPortfolio.slug}`)
    } else {
      push(`/portfolio/new`)
    }
  }, [firstPortfolio]);

  return (
    <main>
      <PortfolioNavLoading />
    </main>
  );
}