"use client";

import DashboardTabs from '@/components/dashboard/Dashboard-Tabs';
import Sidebar from '../../components/dashboard/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0a0e13]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-start justify-center h-full">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
}