import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1422] to-[#0a0e1a]">
      <Cursor />
      <Navbar />
      <main className="lg:ml-72 min-h-screen p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;