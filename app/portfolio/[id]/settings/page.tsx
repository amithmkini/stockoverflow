import PortfolioNav from "../../portfolio-nav";

export default function PortfolioSettings({ params }: { params: { id: number }}) {
  return (
    <main>
      <div className="flex flex-col">
        <PortfolioNav />
      </div>
      <div className="flex flex-col">
        <div className="text-xl m-4">
          Settings
        </div>
      </div>
    </main>
  );
}