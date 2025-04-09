import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard  from './pages/Dashboard';
import  StockDetail from './pages/StockDetail';
import  Backtest  from './pages/Backtest';
import  Reports  from './pages/Reports';
import { Layout } from './components/Layout';
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock/:ticker" element={<StockDetail />} />
          <Route path="backtest" element={<Backtest />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
