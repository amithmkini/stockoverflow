'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

import { PortfolioPicker } from "@/components/portfolio-picker"
import { useToast } from "@/components/ui/use-toast"
import { Portfolio } from "@/db/schema/portfolio"

export function PortfolioNavLoading() {
  return (
    <nav className="flex h-16 grow flex-row items-center space-x-10 px-4">
      <div className="flex-grow"></div>
      <div className="flex">
        <Skeleton className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between" />
        <Skeleton className="w-[7.65rem] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-4" />
      </div>
    </nav>
  )
}


export default function PortfolioNav({ params }: { params: { id: number } }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioValue, setPortfolioValue] = useState(Number(params.id))
  const [newPortfolioValue, setNewPortfolioValue] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  function handleSubmit(event : any) {
    event.preventDefault()
    // Validation. Check for empty string
    if (!newPortfolioValue.trim()) {
      toast({
        variant: "destructive",
        title: "Portfolio name cannot be empty",
        duration: 3000,
      })
      return
    }
    // Check for duplicate portfolio name
    if (portfolios.find((portfolio) => portfolio.name === newPortfolioValue)) {
      toast({
        variant: "destructive",
        title: "Portfolio name already exists",
        duration: 3000,
      })
      return
    }

    portfolios.push({ id: portfolios.length + 1, name: newPortfolioValue, description: "" })
    handlePortfolioChange(portfolios.length)
    setNewPortfolioValue("")
    setDialogOpen(false)
  }

  function handleChange(event : any) {
    setNewPortfolioValue(event.target.value)
  }

  function handlePortfolioChange(value : any) {
    setPortfolioValue(value)
    router.refresh()
    router.push(`/portfolio/${value}`)
  }


  useEffect(() => {
    // Fetch the portfolios and set them to the local state
    const loadData = async () => {
      const data = await fetch("/api/portfolio").then((res) => res.json());
      setPortfolios(data);
    }

    loadData();
  }, []);


  return (
    <nav className="flex h-16 grow flex-row items-center justify-end space-x-10 px-4">
      <div className="flex-grow hidden sm:block"></div>
      <div className="flex">
        <PortfolioPicker
          value={portfolioValue}
          onValueChange={handlePortfolioChange}
          portfolios={portfolios}
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">
              <span className="block sm:hidden">
                +
              </span>
              <span className="hidden sm:block">
                New portfolio
              </span>
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
                  <Input id="name" placeholder="Personal savings" className="col-span-3" 
                   value={newPortfolioValue} onChange={handleChange}/>
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
  );
}
