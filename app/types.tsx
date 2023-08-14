import * as z from 'zod'

// For the table where we mix the holding and symbol tables
export type HoldingTable = {
  name: string
  symbol: string
  ltp: string
  price: string
  quantity: number
}
