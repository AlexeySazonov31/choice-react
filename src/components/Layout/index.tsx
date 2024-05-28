import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const [showModalSpinnerOpt, setShowModalSpinnerOpt] = useState<boolean>(false);
  return (
    <>
      <nav className="fixed bottom-5 left-1/2 z-10 -ml-32 flex w-64 select-none justify-center divide-x divide-zinc-800 overflow-hidden rounded-lg border border-zinc-800 text-center text-zinc-500 *:flex-1 *:bg-zinc-900 *:py-3 *:transition-all">
        <Link
          to="/"
          data-active={location.pathname === "/"}
          className="data-[active=true]:text-zinc-300"
        >
          Binary
        </Link>
        <Link
          to="/spinner"
          data-active={location.pathname === "/spinner"}
          className="data-[active=true]:text-zinc-400 data-[active=true]:hover:text-zinc-300"
          onClick={() => location.pathname === "/spinner" && setShowModalSpinnerOpt(true)}
        >
          {location.pathname === "/spinner" ? "Items" : "Spinner"}
        </Link>
      </nav>
      <Outlet context={[showModalSpinnerOpt, setShowModalSpinnerOpt]} />
    </>
  );
}
