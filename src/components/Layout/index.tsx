import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <div className="absolute bottom-5 left-1/2 -ml-32 flex w-64 justify-center divide-x overflow-hidden rounded-md border border-white text-center *:flex-1 *:bg-slate-900 *:py-3">
        <Link to="/">Home</Link>
        <Link to="/spinner">Spinner</Link>
      </div>
      <Outlet />
    </div>
  );
}
