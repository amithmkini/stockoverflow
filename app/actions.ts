'use server'

import { auth } from '@clerk/nextjs'
import { and, eq, sql } from 'drizzle-orm'
import { v4 as uuid } from 'uuid'

import { db } from '@/lib/db'

import { holdingTable, transactionTable } from '@/db/schema/holding'
import { symbolTable } from '@/db/schema/stock'
import { HoldingTable } from '@/app/types'

// React Server actions
export async function getHoldings(
  portfolioId: string,
): Promise<HoldingTable[]> {
  const { userId } = auth()
  if (!userId) {
    return []
  }

  // Get the holdings for the portfolio
  const holdings = await db
    .select({
      name: symbolTable.name,
      symbol: symbolTable.symbol,
      ltp: symbolTable.currentPrice,
      price: holdingTable.avgPricePerShare,
      quantity: holdingTable.quantity
    })
    .from(holdingTable)
    .where(eq(holdingTable.portfolioId, portfolioId))
    .innerJoin(symbolTable, eq(holdingTable.symbolId, symbolTable.id))

  return holdings
}

export async function addHoldingAndTx(
  portfolioId: string,
  symbolId: number,
  avgPricePerShare: number,
  quantity: number,
  txDate: Date,
): Promise<void> {
  const { userId } = auth()
  if (!userId) {
    return
  }

  const avg_price_per_share = String(avgPricePerShare)
      
  // Add the holding to the portfolio
  const holdingId = uuid()
  await db.insert(holdingTable).values({
    id: holdingId,
    portfolioId,
    symbolId,
    avgPricePerShare: avg_price_per_share,
    quantity
  })

  // Also add a transaction for the holding
  await db.insert(transactionTable).values({
    id: uuid(),
    holdingsId: holdingId,
    txDate: txDate,
    txType: 'buy',
    quantity,
    value: avg_price_per_share,
    brokerage: '0',
    stt: '0',
    otherCharges: '0'
  })
}