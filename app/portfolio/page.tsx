// Get a list of portfolios, and redirect to the first one.
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Portfolio } from '@/db/schema/portfolio'

export default function Portfolio() {
  const { push } = useRouter()

  useEffect(() => {
    // Fetch the portfolios and set the first one
    const loadData = async () => {
      const data = await fetch('/api/portfolio').then((res) => res.json())
      if (data[0]) {
        push(`/portfolio/${data[0].slug}`)
      } else {
        push(`/portfolio/new`)
      }
    }
    loadData()
  }, [])

  return <main></main>
}
