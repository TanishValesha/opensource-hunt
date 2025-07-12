"use client";

import DashboardTabs from '@/components/dashboard/Dashboard-Tabs';
import Sidebar from '../../components/dashboard/Sidebar';

export default function Home() {
  return (

    <div className="flex h-screen bg-[#0a0e13] overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-80 flex flex-col h-full">
        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-start justify-center h-full z-30 p-8">
            <DashboardTabs />
          </div>
        </div>
      </div>
    </div>

  );
}