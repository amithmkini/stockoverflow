import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioTable } from "@/db/schema/portfolio"

export async function GET(request: NextRequest) {
  const portfolios = await db.select().from(portfolioTable);
  return NextResponse.json(portfolios);
}
