"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Calendar,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">$45,231.89</p>
                <p className="text-green-400 text-sm mt-1">+20.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Subscriptions</p>
                <p className="text-2xl font-bold text-white mt-1">+2350</p>
                <p className="text-green-400 text-sm mt-1">+180.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Sales</p>
                <p className="text-2xl font-bold text-white mt-1">+12,234</p>
                <p className="text-green-400 text-sm mt-1">+19% from last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Now</p>
                <p className="text-2xl font-bold text-white mt-1">+573</p>
                <p className="text-green-400 text-sm mt-1">+201 since last hour</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors duration-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">New user registered</p>
                  <p className="text-gray-400 text-xs">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    content: (
      <div className="space-y-6">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">98.5%</p>
              <p className="text-gray-400 text-sm">Uptime</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-2xl font-bold text-green-400">2.3s</p>
              <p className="text-gray-400 text-sm">Avg Response</p>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">15.2k</p>
              <p className="text-gray-400 text-sm">Daily Visitors</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {[
              { source: 'Direct', percentage: 45, color: 'bg-blue-500' },
              { source: 'Search Engines', percentage: 30, color: 'bg-green-500' },
              { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
              { source: 'Referrals', percentage: 10, color: 'bg-orange-500' }
            ].map((item) => (
              <div key={item.source} className="flex items-center gap-4">
                <div className="w-20 text-gray-400 text-sm">{item.source}</div>
                <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-white text-sm font-medium">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: Calendar,
    content: (
      <div className="space-y-6">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Sales Report', date: 'December 2024', status: 'Ready' },
              { title: 'User Analytics', date: 'December 2024', status: 'Processing' },
              { title: 'Revenue Summary', date: 'November 2024', status: 'Ready' },
              { title: 'Performance Report', date: 'November 2024', status: 'Ready' }
            ].map((report, index) => (
              <div key={index} className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{report.title}</h4>
                    <p className="text-gray-400 text-sm">{report.date}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    report.status === 'Ready' 
                      ? "bg-green-500/10 text-green-400" 
                      : "bg-yellow-500/10 text-yellow-400"
                  )}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'goals',
    label: 'Goals',
    icon: Target,
    content: (
      <div className="space-y-6">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Current Goals</h3>
          <div className="space-y-4">
            {[
              { goal: 'Increase Monthly Revenue', current: 75, target: 100, unit: 'k' },
              { goal: 'User Acquisition', current: 1250, target: 2000, unit: '' },
              { goal: 'Customer Satisfaction', current: 4.2, target: 4.5, unit: '/5' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{item.goal}</h4>
                  <span className="text-gray-400 text-sm">
                    {item.current}{item.unit} / {item.target}{item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-600/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.current / item.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  {Math.round((item.current / item.target) * 100)}% complete
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="relative mb-8 w-full">
        <div className="flex justify-center items-center w-full gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative flex items-center gap-2 px-8 py-4 text-md font-medium transition-all duration-300",
                "hover:text-white focus:outline-none",
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              
              {/* Active tab indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                />
              )}
              
              {/* Hover indicator */}
              {hoveredTab === tab.id && activeTab !== tab.id && (
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 bg-gray-400"
                  initial={{ width: 0, x: "-50%" }}
                  animate={{ width: "100%", x: "-50%" }}
                  exit={{ width: 0, x: "-50%" }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 10
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
            className={cn(
              "transition-all duration-300",
              activeTab === tab.id ? "block" : "hidden"
            )}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}