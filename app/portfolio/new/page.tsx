'use client'

import PortfolioNav from '../portfolio-nav'
import { useState, Suspense, useEffect } from 'react'

export default function Portfolio({ params }: { params: { slug: string } }) {
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    setShowDialog(true)
  }, [])

  return (
    <main>
      <div className="flex flex-col">
        <PortfolioNav portfolio={null} showDialog={showDialog} />
      </div>
    </main>
  )
}
