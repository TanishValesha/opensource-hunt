"use client";

import { useState } from 'react';
import DashboardTabs from '@/components/dashboard/Dashboard-Tabs';
import Sidebar from '../../components/dashboard/Sidebar';
import { FolderCode, Search } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  isActive?: boolean;
  submenuItems?: string[];
}

const initialItems: MenuItem[] = [
  { id: 'discover', label: 'Discover', icon: Search, isActive: true },
  { id: 'projects', label: 'Projects', icon: FolderCode, isActive: false }
];

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);

  const activeItem = menuItems.find(item => item.isActive);
  const activeItemId = activeItem?.id;

  const handleItemClick = (clickedId: string) => {
    setMenuItems(prev =>
      prev.map(item => ({
        ...item,
        isActive: item.id === clickedId
      }))
    );
  };

  return (
    <div className="flex h-screen bg-[#0a0e13] overflow-hidden">
      {/* Sidebar */}
      <Sidebar initialMenuItems={menuItems} onItemClick={handleItemClick} />

      {/* Main Content */}
      <div className="flex-1 ml-80 flex flex-col h-full">
        {activeItemId === 'discover' && (
          <div className="flex-1 overflow-hidden">
            <div className="flex items-start justify-center h-full z-30 p-8">
              <DashboardTabs />
            </div>
          </div>
        )}
        {activeItemId === 'projects' && (
          <div className="flex-1 overflow-hidden">
            <p>Hi</p>
          </div>
        )}
      </div>
    </div>
  );
}
