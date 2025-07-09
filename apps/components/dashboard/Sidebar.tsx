"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight, Search, LayoutDashboard, FileText, Package, CheckSquare, Star, Users, DollarSign, Puzzle, Settings, BookTemplate as Template, ArrowRight, User } from 'lucide-react';
import { ImGithub } from "react-icons/im";
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';


interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  isActive?: boolean;
  submenuItems?: string[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isActive: true },
  
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const {data: session} = useSession();

  const userName = session?.user?.name?.replace(" ", "");

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="w-78 bg-[#0f1419] border-r border-gray-800/50 flex flex-col h-screen shadow-xl">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.hasSubmenu && toggleExpanded(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                item.isActive 
                  ? "bg-purple-500/10 text-purple-400 border-l-2 border-purple-500" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors duration-200",
                item.isActive ? "text-purple-400" : "text-gray-400 group-hover:text-white"
              )} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.hasSubmenu && (
                <div className="transition-transform duration-200">
                  {expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              )}
            </button>
            
            {/* Submenu */}
            {item.hasSubmenu && (
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                expandedItems.includes(item.id) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="ml-8 mt-1 space-y-1">
                  <div className="py-1 px-3 text-xs text-gray-500 rounded hover:text-gray-400 cursor-pointer transition-colors duration-200">
                    Submenu item 1
                  </div>
                  <div className="py-1 px-3 text-xs text-gray-500 rounded hover:text-gray-400 cursor-pointer transition-colors duration-200">
                    Submenu item 2
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      { session && (
      <a href={`https://github.com/${userName}`} className="p-4 border-gray-800/50" target="_blank" rel="noopener noreferrer">

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group">
            <Image src={session?.user?.image as string} width={40} height={40} alt="User Profile" className="text-white rounded-full" />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{session?.user?.name}</div>
            <div  className="text-xs text-gray-400"><span className='flex justify-start items-center'>View on GitHub <ImGithub className='ml-1'/></span></div>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
        </div>
      </a>

    )}
    </div>
  );
}