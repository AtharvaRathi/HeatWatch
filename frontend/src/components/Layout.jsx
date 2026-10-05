import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      {/* Background Layer for Glassmorphism */}
      <div className="app-bg-image" />
      <div className="app-bg-overlay" />
      
      <div className="flex min-h-screen text-white font-[Inter,sans-serif] transition-colors relative z-0">
        
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          closeMobileSidebar={() => setMobileSidebarOpen(false)}
        />

        {/* Main View Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto relative z-10">
            {children}
          </main>

        </div>
      </div>
    </>
  );
};

export default Layout;
