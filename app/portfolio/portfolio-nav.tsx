'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

export function PortfolioNavLoading() {
  return (
    <nav className="flex h-16 grow flex-row items-center space-x-10 px-4">
      <div className="flex-grow"></div>
      <div className="flex">
        <Skeleton className="inline-flex h-9 w-[200px] items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        <Skeleton className="ml-4 inline-flex h-9 w-[7.65rem] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </div>
    </nav>
  )
}

interface PortfolioNavProps {
  portfolio: Portfolio | null
  showDialog?: boolean
  settingsPage?: boolean
}

export default function PortfolioNav({
  portfolio,
  showDialog = false,
  settingsPage = false,
}: PortfolioNavProps) {
  // Find the portfolio with the given slug
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(
    portfolio,
  )
  const [newPortfolioName, setNewPortfolioName] = useState('')
  const [settingsIcon, setSettingsIcon] = useState<JSX.Element | null>(
    <>
      <Link href={`/portfolio/${currentPortfolio?.slug}/settings`}>
        <GearIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
      </Link>
    </>,
  )

  const [dialogOpen, setDialogOpen] = useState(showDialog)
  const { toast } = useToast()
  const router = useRouter()

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
    if (portfolios.find((portfolio) => portfolio.slug === newPortfolioSlug)) {
      toast({
        variant: 'destructive',
        title: 'Portfolio name already exists',
        duration: 3000,
      })
      return
    }

    // Send a POST request to the API to create a new portfolio
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPortfolioName,
      }),
    })

    const portfolio = await res.json()
    if (portfolio.error || res.status !== 200) {
      toast({
        variant: 'destructive',
        title: "Portfolio couldn't be created",
        duration: 3000,
      })
      return
    }
    // portfolios.push({ id: id, name: newPortfolioName, userId: "test", slug: "test", description: "" })
    handlePortfolioChange(portfolio[0])
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

  useEffect(() => {
    // Fetch the portfolios and set them to the local state
    const loadData = async () => {
      const data = await fetch('/api/portfolio').then((res) => res.json())
      setPortfolios(data)
    }
    loadData()
  }, [])

  useEffect(() => {
    setDialogOpen(showDialog)
  }, [showDialog])

  useEffect(() => {
    if (settingsPage) {
      setSettingsIcon(
        <>
          <Link href={`/portfolio/${currentPortfolio?.slug}/`}>
            <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          </Link>
        </>,
      )
    }
  }, [settingsPage])

  return (
    <nav className="flex h-16 grow flex-row items-center justify-end space-x-10 px-4">
      <div className="hidden flex-grow sm:block"></div>
      <div className="flex items-center">
        <div className="m-4">
          <Button className="ml-4" size="icon">
            {settingsIcon}
          </Button>
        </div>
        <PortfolioPicker
          value={currentPortfolio}
          onValueChange={handlePortfolioChange}
          portfolios={portfolios}
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
