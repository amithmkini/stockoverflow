'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { HoldingTable } from '@/app/types'

export const columns: ColumnDef<HoldingTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      const holding = row.original

      return (
        <div className="flex items-center space-x-2">
          <div>
            <div className="text-sm font-medium">{holding.name}</div>
            <div className="text-sm text-gray-500">{holding.symbol}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'ltp',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="LTP" />
    },
    cell: ({ row }) => {
      const holding = row.original

      return <div className="text-sm">{holding.ltp}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />
    },
    cell: ({ row }) => {
      const holding = row.original

      return <div className="text-sm">{holding.price}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />
    },
    cell: ({ row }) => {
      const holding = row.original

      return <div className="text-sm">{holding.quantity}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Value" />
    },
    cell: ({ row }) => {
      const holding = row.original

      return <div className="text-sm">{(holding.quantity ?? 0) * Number(holding.price)}</div>
    },
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />
    },
    cell: ({ row }) => {
      const holding = row.original
      const value = ((holding.quantity ?? 0) * (Number(holding.price) - Number(holding.ltp))).toFixed(2)
      return <div className="text-sm">{value}</div>
    },
  },
  {
    accessorKey: 'profitPercent',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit %" />
    },
    cell: ({ row }) => {
      const holding = row.original
      const profit = ((holding.quantity ?? 0) * (Number(holding.price) - Number(holding.ltp)))
      const value = (holding.quantity ?? 0) * Number(holding.price)
      const percent = ((profit / value) * 100).toFixed(2)
      return <div className="text-sm">{percent} %</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const holding = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(holding.symbol ?? '')}
            >
              Copy Holding Symbol
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit/Delete holding</DropdownMenuItem>
            <DropdownMenuItem>Buy/Sell holding</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
