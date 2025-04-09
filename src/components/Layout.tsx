import { Outlet, Link, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto flex justify-around">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/stock/RELIANCE" active={location.pathname.includes("/stock")}>
            Trade
          </NavLink>
          <NavLink to="/backtest" active={location.pathname === "/backtest"}>
            Backtest
          </NavLink>
          <NavLink to="/reports" active={location.pathname === "/reports"}>
            Reports
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center justify-center py-4 px-4 ${
        active ? 'text-blue-500 font-bold' : 'text-gray-600'
      }`}
    >
      {children}
    </Link>
  );
}