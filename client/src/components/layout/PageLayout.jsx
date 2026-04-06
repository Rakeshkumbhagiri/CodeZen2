import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PageLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen text-gray-900 bg-gray-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />
      <main className={`mt-16 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)] transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;