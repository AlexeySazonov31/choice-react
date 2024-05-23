import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components";
import { Home, NotFound, Spinner } from "../../Pages";

export function RouterSwitcher() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
