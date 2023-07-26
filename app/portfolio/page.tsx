import type { Metadata } from "next"

import PortfolioNav from "./portfolio-nav";

export const metadata: Metadata = {
  title: "Portfolio - StockOverflow",
  description: "Portfolio page of StockOverflow",
};

export default function Portfolio() {
  // The navbar of the portfolio page and its contents
  return (
    <main>
      <div className="flex flex-col">
        <PortfolioNav />
      </div>
    </main>
  );
}
