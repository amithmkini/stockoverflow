'use client'

import { useState } from "react"

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

import { PortfolioPicker } from "@/components/portfolio-picker"
import { useToast } from "@/components/ui/use-toast"

var portfolios = [
  { value: 1, label: "Portfolio1" },
  { value: 2, label: "Portfolio2" },
  { value: 3, label: "Portfolio3" },
]

export default function PortfolioNav() {

  const [portfolioValue, setPortfolioValue] = useState(0)
  const [newPortfolioValue, setNewPortfolioValue] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

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
    if (portfolios.find((portfolio) => portfolio.label === newPortfolioValue)) {
      toast({
        variant: "destructive",
        title: "Portfolio name already exists",
        duration: 3000,
      })
      return
    }

    portfolios.push({ value: portfolios.length + 1, label: newPortfolioValue })
    setPortfolioValue(portfolios.length)
    setNewPortfolioValue("")
    setDialogOpen(false)
  }

  function handleChange(event : any) {
    setNewPortfolioValue(event.target.value)
  }

  return (
    <nav className="flex h-16 grow flex-row items-center space-x-10 px-4">
      <div className="flex-grow"></div>
      <div className="flex">
        <PortfolioPicker
          value={portfolioValue}
          onValueChange={setPortfolioValue}
          portfolios={portfolios}
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">New portfolio</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New portfolio</DialogTitle>
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
