// components/StockCard.tsx
import React from 'react';

interface StockCardProps {
  ticker: string;
  price: number;
  percent_change: number;
  change: number;
}

export const StockCard: React.FC<StockCardProps> = ({ ticker, price, percent_change }) => {
  const isPositive = percent_change >= 0;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[120px] flex flex-col justify-between border">
      <div>
        <p className="text-sm font-semibold text-gray-600">{ticker}</p>
        <p className="text-xl font-bold">₹{price}</p>
      </div>
      <div className={`px-3 py-1 rounded-md text-white text-sm w-fit ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}>
        {isPositive ? '+' : ''}{percent_change}%
      </div>
    </div>
  );
};
