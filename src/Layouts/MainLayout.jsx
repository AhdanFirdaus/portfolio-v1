import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-bg-main">
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