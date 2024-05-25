import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../../components";
import { Binary, Spinner } from "../../Pages";

export function RouterSwitcher() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Binary />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
