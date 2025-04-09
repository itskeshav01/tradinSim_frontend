import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BASE_API = "http://localhost:8000/api"; // Your Django base URL

export default function StockDetail() {
  const { ticker } = useParams();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [trades, setTrades] = useState([]);
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const ws = useRef(null);

  const { post, get } = useFetch(BASE_API);

  // WebSocket Connection
  useEffect(() => {
    if (!ticker) return;

    const socket = new WebSocket(`ws://localhost:8000/ws/stocks/${ticker}/`);
    ws.current = socket;

    socket.onopen = () => setWsStatus("Connected");
    socket.onclose = () => setWsStatus("Disconnected");
    socket.onerror = () => setWsStatus("Error connecting");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.price) setPrice(data.price);
    };

    return () => {
      socket.close();
    };
  }, [ticker]);

  // Buy Trade
  const handleBuy = async () => {
    const body = {
      ticker: ticker,
      price: price,
      quantity: quantity,
      side: "BUY"
    };

    try {
      const trade = await post("/trades/", body);
      setTrades(prev => [...prev, trade]);
    } catch (err) {
      console.error("Buy failed:", err);
    }
  };

  // Sell Trade (either from panel or existing buy)
  const handleSell = async (buyTrade = null) => {
    const tradeData = {
      ticker: ticker,
      price: price,
      quantity: buyTrade?.quantity || quantity,
      side: "SELL"
    };

    try {
      const trade = await post("/trades/", tradeData);
      setTrades(prev => [...prev, trade]);
    } catch (err) {
      console.error("Sell failed:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{ticker}</h2>
      <p className="text-lg mb-4">Live Price: ₹{price} <span className="text-sm text-gray-500">({wsStatus})</span></p>

      {/* Trading Panel */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border px-3 py-2 rounded w-full mb-4"
        />

        <div className="flex gap-4">
          <button
            onClick={handleBuy}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buy
          </button>
          <button
            onClick={() => handleSell()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Trade List */}
      <h3 className="text-lg font-semibold mb-2">Executed Trades</h3>
      <div className="space-y-2">
        {trades.map((trade, idx) => (
          <div key={idx} className="bg-gray-100 p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{trade.side.toUpperCase()} @ ₹{trade.price}</p>
              <p className="text-sm text-gray-500">{trade.quantity} shares</p>
            </div>
            {trade.side === "buy" && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleSell(trade)}
              >
                Close (Sell)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
