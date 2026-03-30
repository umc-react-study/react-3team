import Header from "../components/layout/Header";
import LeftSidebar from "../components/layout/LeftSidebar";
import MainLayout from "../components/layout/MainLayout";
import RightSidebar from "../components/layout/RightSidebar";

export default function MainPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1100px] mx-auto flex gap-4">
        {/* 왼쪽 사이드바 */}
        <aside className="hidden lg:block sticky top-0 self-start">
          <LeftSidebar />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="w-full max-w-[600px] mx-auto flex flex-col gap-4">
          <Header />
          <MainLayout />
        </main>

        {/* 오른쪽 사이드바 */}
        <aside className="hidden lg:block sticky top-0 self-start">
          <RightSidebar />
        </aside>
      </div>
    </div>
  )
}