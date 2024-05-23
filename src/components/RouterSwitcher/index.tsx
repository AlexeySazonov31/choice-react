import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../../components";
import { Home, Spinner } from "../../Pages";

export function RouterSwitcher() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
