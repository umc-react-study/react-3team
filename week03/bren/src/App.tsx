import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ContextSettingsPage from "./pages/ContextSettingsPage";
import ReduxTodoPage from "./pages/ReduxTodoPage";
import ZustandProductsPage from "./pages/ZustandProductsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/redux" replace />} />
        <Route path="/redux" element={<ReduxTodoPage />} />
        <Route path="/context" element={<ContextSettingsPage />} />
        <Route path="/zustand" element={<ZustandProductsPage />} />
      </Route>
    </Routes>
  );
}
