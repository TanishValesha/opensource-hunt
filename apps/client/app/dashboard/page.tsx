"use client";

import Sidebar from '../../components/dashboard/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0a0e13]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Dashboard X</h1>
            <p className="text-gray-400 text-lg">Your content will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}