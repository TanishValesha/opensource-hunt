"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, LayoutDashboard, FileText, Package, CheckSquare, Star, Users, DollarSign, Puzzle, Settings, BookTemplate as Template, ArrowRight, User, LogOutIcon } from 'lucide-react';
import { ImGithub } from "react-icons/im";
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  isActive?: boolean;
  submenuItems?: string[];
}

const menuItems: MenuItem[] = [
  { id: 'discover', label: 'Discover', icon: Search, isActive: true },

];



export default function Sidebar() {
  // const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState<{ login: string, id: string, avatar_url: string, url: string, html_url: string, followers_url: string, following_url: string, name: string }>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setUserDetails(data.data)
      } catch (error) {
        console.error(error)
      }

    }
    getUserData();
  }, [])

  const handleLogout = () => {
    signOut({
      callbackUrl: `${window.location.origin}/`
    });
  };

  return (
    <div className="w-78 bg-[#0f1419] border-r fixed left-0 top-0 border-gray-800/50 flex flex-col h-screen shadow-xl">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
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
            </button>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      {userDetails != null && (
        <div className='flex justify-start items-center'>
          <a href={`${userDetails.html_url}`} className="p-4 border-gray-800/50" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group">
              <Image src={userDetails.avatar_url} width={40} height={40} alt="User Profile" className="text-white rounded-full" />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{userDetails.name}</div>
                <div className="text-xs text-gray-400"><span className='flex justify-start items-center'>View on GitHub <ImGithub className='ml-1' /></span></div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
            </div>
          </a>
          <div>
            <LogOutIcon className='text-white cursor-pointer hover:scale-105' onClick={handleLogout} />
          </div>
        </div>
      )}
    </div>
  );
}