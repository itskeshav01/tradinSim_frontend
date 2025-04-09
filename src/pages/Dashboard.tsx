// pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { StockCard } from "../components/dashboard/StockCard";
import { Link } from "react-router-dom";

interface StockData {
  ticker: string;
  price: number;
  percent_change: number;
  change: number;
}

const Dashboard = () => {
  const { get, loading } = useFetch("http://localhost:8000/api/");
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    get("top-stocks/")
      .then((data: any) => setStocks(data as StockData[]))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Top Stocks</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stocks.map((stock) => (
            <Link key={stock.ticker} to={`/stock/${stock.ticker}`}>
              <StockCard {...stock} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
