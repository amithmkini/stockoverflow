'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { HoldingTable } from '@/app/types'
import RowActions from './row-actions'

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

      return (
        <div className="text-sm">
          {(holding.quantity ?? 0) * Number(holding.price)}
        </div>
      )
    },
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />
    },
    cell: ({ row }) => {
      const holding = row.original
      const value = (
        (holding.quantity ?? 0) *
        (Number(holding.ltp) - Number(holding.price))
      ).toFixed(2)
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
      const profit =
        (holding.quantity ?? 0) * (Number(holding.ltp) - Number(holding.price))
      const value = (holding.quantity ?? 0) * Number(holding.price)
      const percent = ((profit / value) * 100).toFixed(2)
      return <div className="text-sm">{percent} %</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions row={row} />
    },
  },
]
