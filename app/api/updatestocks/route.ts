import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { md5 } from 'hash-wasm'
import { parse } from 'csv-parse/sync' 

import { db } from '@/lib/db'
import { nseListTable } from '@/db/schema/stock'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  // Steps to follow:
  // 1. Download the list from NSE_EQUITY_LIST_URL
  // 2. Check if the list has changed by comparing the md5sum
  // 3. If the list has changed, parse the CSV list and get the symbols
  // 4. For each symbol in the list, check if the symbol exists in the database
  // 5. If the symbol does not exist, add it to the database
  
  const nseEquityList = await fetch(process.env.NSE_EQUITY_LIST_URL!)
  const nseEquityListText = await nseEquityList.text()
  const nseEquityListMd5sum = await md5(nseEquityListText)

  const nseList = await db.query.nseListTable.findFirst({
    where: eq(nseListTable.md5sum, nseEquityListMd5sum),
  })

  if (nseList) {
    return NextResponse.json({
      status: 200,
      message: "NSE Equity List has not changed",
      md5sum: nseEquityListMd5sum,
    })
  }

  await db.insert(nseListTable).values({
    date: new Date(),
    md5sum: nseEquityListMd5sum,
  }).execute()

  // Now parse the CSV file and get the symbols
  await parse(nseEquityListText, {
    columns: true,
    skip_empty_lines: true,
  })

  return NextResponse.json({
    status: 200,
    message: "NSE Equity List has changed",
    md5sum: nseEquityListMd5sum,
  })
}
