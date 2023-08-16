'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { ArrowLeftIcon, GearIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { PortfolioPicker } from '@/components/portfolio-picker'

import { Portfolio } from '@/db/schema/portfolio'
import { slugify } from '@/lib/utils'
import { addPortfolio } from '@/app/actions'

export function PortfolioNavLoading() {
  return (
    <nav className="flex h-16 grow flex-row items-center space-x-10 px-4">
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <Skeleton className="m-4 ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        <Skeleton className="inline-flex h-9 w-[200px] items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        <Skeleton className="ml-4 inline-flex h-9 w-[7.65rem] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </div>
    </nav>
  )
}

interface PortfolioNavProps {
  portfolios: Promise<Portfolio[]>
}

export default function PortfolioNav({ portfolios }: PortfolioNavProps) {
  // Find the portfolio with the given slug
  const portfolioList = React.use(portfolios)

  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(
    null,
  )
  const [newPortfolioName, setNewPortfolioName] = useState('')
  const [settingsIcon, setSettingsIcon] = useState<JSX.Element | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { slug } = useParams()
  const pathname = usePathname()

  // If the slug changes, update the current portfolio
  useEffect(() => {
    if (slug) {
      const portfolio = portfolioList.find(
        (portfolio) => portfolio.slug === slug,
      )
      setCurrentPortfolio(portfolio || null)
    }
  }, [slug, portfolioList])

  // If there are no portfolios, show the dialog
  useEffect(() => {
    if (portfolioList.length === 0) {
      setDialogOpen(true)
    }
  }, [portfolioList])

  // If the page is the settings page, show the back button
  useEffect(() => {
    if (pathname.endsWith('settings')) {
      setSettingsIcon(
        <Link href={`/portfolio/${currentPortfolio?.slug}`}>
          <Button className="ml-4" size="icon">
            <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          </Button>
        </Link>,
      )
    } else {
      setSettingsIcon(
        <Link href={`/portfolio/${currentPortfolio?.slug}/settings`}>
          <Button className="ml-4" size="icon">
            <GearIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          </Button>
        </Link>,
      )
    }
  }, [pathname, currentPortfolio])

  async function handleSubmit(event: any) {
    event.preventDefault()
    // Validation. Check for empty string
    if (!newPortfolioName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Portfolio name cannot be empty',
        duration: 3000,
      })
      return
    }

    // If the portfolio name is "new", then we can't create it
    if (newPortfolioName.toLowerCase() === 'new') {
      toast({
        variant: 'destructive',
        title: "Portfolio name cannot be 'new'",
        duration: 3000,
      })
      return
    }

    // Convert to slug and check for duplicate slugs
    const newPortfolioSlug = slugify(newPortfolioName)
    if (
      portfolioList.find((portfolio) => portfolio.slug === newPortfolioSlug)
    ) {
      toast({
        variant: 'destructive',
        title: 'Portfolio name already exists',
        duration: 3000,
      })
      return
    }

    // Send a POST request to the API to create a new portfolio
    const portfolio = await addPortfolio(newPortfolioName)

    if (!portfolio) {
      toast({
        variant: 'destructive',
        title: "Portfolio couldn't be created",
        duration: 3000,
      })
      return
    }
    // portfolios.push({ id: id, name: newPortfolioName, userId: "test", slug: "test", description: "" })
    handlePortfolioChange(portfolio)
    setNewPortfolioName('')
    setDialogOpen(false)
  }

  function handleChange(event: any) {
    setNewPortfolioName(event.target.value)
  }

  function handlePortfolioChange(value: Portfolio | null = null) {
    setCurrentPortfolio(value)
    router.refresh()
    if (value) {
      router.push(`/portfolio/${value.slug}`)
    }
  }

  return (
    <nav className="flex h-16 grow flex-row items-center justify-end space-x-10 px-4">
      <div className="hidden flex-grow sm:block"></div>
      <div className="flex items-center">
        <div className="m-4">{settingsIcon}</div>
        <PortfolioPicker
          value={currentPortfolio}
          onValueChange={handlePortfolioChange}
          portfolios={portfolioList}
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">
              <span className="block sm:hidden">+</span>
              <span className="hidden sm:block">New portfolio</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Portfolio</DialogTitle>
              <DialogDescription>
                Create a new portfolio to manage your assets.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Portfolio Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Personal savings"
                    className="col-span-3"
                    value={newPortfolioName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}
