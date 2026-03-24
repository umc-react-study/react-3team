import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#222]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
