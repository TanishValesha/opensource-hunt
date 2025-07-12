"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GitHubReposGrid from './discover/GitHubGrid';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'good-first-issues',
    label: 'Good First Issues',
    icon: BarChart3,
    content: (
      <GitHubReposGrid />
    )
  }
];

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('good-first-issues');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col mt-4">
      {/* Tab Navigation */}
      <div className="relative mb-8 w-full flex-shrink-0">
        <div className="flex justify-center items-center w-full gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative flex items-center gap-2 px-8 py-4 text-md font-medium transition-all duration-300 hover:text-white focus:outline-none ${activeTab === tab.id ? 'text-white' : 'text-gray-400'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>

              {/* Active tab indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}

              {/* Hover indicator */}
              {hoveredTab === tab.id && activeTab !== tab.id && (
                <div
                  className="absolute bottom-0 left-1/2 h-0.5 bg-gray-400 transition-all duration-200"
                  style={{
                    width: '100%',
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-all duration-300 ${activeTab === tab.id ? 'block' : 'hidden'
              }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}