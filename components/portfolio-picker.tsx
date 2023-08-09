'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Portfolio } from '@/db/schema/portfolio'

interface PortfolioPickerProps {
  value: Portfolio | null
  onValueChange: (value: Portfolio) => void
  portfolios: Portfolio[]
}

// Pass the useState as a prop to the Popover component
export function PortfolioPicker({
  value,
  onValueChange,
  portfolios,
}: PortfolioPickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.name : 'Select portfolio...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search portfolio..." />
          <CommandEmpty>No portfolio found.</CommandEmpty>
          <CommandGroup>
            {portfolios.map((portfolio) => (
              <CommandItem
                key={portfolio.id}
                onSelect={() => {
                  onValueChange(portfolio)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value
                      ? value.id === portfolio.id
                        ? 'opacity-100'
                        : 'opacity-0'
                      : 'opacity-0',
                  )}
                />
                {portfolio.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
