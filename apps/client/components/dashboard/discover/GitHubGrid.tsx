"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Loader2, RefreshCw, Search, Filter } from 'lucide-react';
import GitHubRepoCard from './GitHubRepoCard';

// Mock data for demonstration - replace with your actual API call
const mockRepos = [
  {
    id: 1,
    name: "awesome-dashboard",
    description: "A beautiful and responsive dashboard built with Next.js, TypeScript, and Tailwind CSS. Features real-time data visualization and modern UI components.",
    html_url: "https://github.com/user/awesome-dashboard",
    language: "TypeScript",
    stargazers_count: 1247,
    forks_count: 89,
    watchers_count: 1247,
    updated_at: "2024-01-15T10:30:00Z",
    created_at: "2023-06-20T14:22:00Z",
    size: 2048,
    open_issues_count: 12,
    private: false,
    topics: ["dashboard", "nextjs", "typescript", "tailwindcss", "react"]
  },
  {
    id: 2,
    name: "ml-prediction-engine",
    description: "Machine learning prediction engine using Python and TensorFlow for real-time data analysis and forecasting.",
    html_url: "https://github.com/user/ml-prediction-engine",
    language: "Python",
    stargazers_count: 892,
    forks_count: 156,
    watchers_count: 892,
    updated_at: "2024-01-10T08:15:00Z",
    created_at: "2023-03-15T09:45:00Z",
    size: 5120,
    open_issues_count: 8,
    private: false,
    topics: ["machine-learning", "python", "tensorflow", "ai", "data-science"]
  },
  {
    id: 3,
    name: "crypto-trading-bot",
    description: "Automated cryptocurrency trading bot with advanced algorithms and risk management features.",
    html_url: "https://github.com/user/crypto-trading-bot",
    language: "JavaScript",
    stargazers_count: 2156,
    forks_count: 324,
    watchers_count: 2156,
    updated_at: "2024-01-12T16:20:00Z",
    created_at: "2023-01-10T11:30:00Z",
    size: 3072,
    open_issues_count: 5,
    private: true,
    topics: ["cryptocurrency", "trading", "bot", "javascript", "automation"]
  },
  {
    id: 4,
    name: "react-component-library",
    description: "A comprehensive React component library with TypeScript support and Storybook documentation.",
    html_url: "https://github.com/user/react-component-library",
    language: "TypeScript",
    stargazers_count: 567,
    forks_count: 78,
    watchers_count: 567,
    updated_at: "2024-01-08T12:45:00Z",
    created_at: "2023-08-05T15:20:00Z",
    size: 1536,
    open_issues_count: 3,
    private: false,
    topics: ["react", "components", "typescript", "storybook", "ui-library"]
  },
  {
    id: 5,
    name: "blockchain-explorer",
    description: "Blockchain explorer and analytics platform with real-time transaction monitoring and visualization.",
    html_url: "https://github.com/user/blockchain-explorer",
    language: "Go",
    stargazers_count: 1834,
    forks_count: 267,
    watchers_count: 1834,
    updated_at: "2024-01-14T09:10:00Z",
    created_at: "2023-04-12T13:15:00Z",
    size: 4096,
    open_issues_count: 15,
    private: false,
    topics: ["blockchain", "cryptocurrency", "explorer", "go", "analytics"]
  },
  {
    id: 6,
    name: "mobile-fitness-app",
    description: "Cross-platform mobile fitness application built with React Native and Firebase backend.",
    html_url: "https://github.com/user/mobile-fitness-app",
    language: "JavaScript",
    stargazers_count: 743,
    forks_count: 112,
    watchers_count: 743,
    updated_at: "2024-01-11T14:30:00Z",
    created_at: "2023-07-18T10:45:00Z",
    size: 2560,
    open_issues_count: 7,
    private: false,
    topics: ["react-native", "mobile", "fitness", "firebase", "health"]
  }
];

export default function GitHubReposGrid() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  useEffect(() => {
    // Simulate API call
    const fetchRepos = async () => {
      setLoading(true);
      // Replace this with your actual GitHub API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRepos(mockRepos);
      setLoading(false);
    };

    fetchRepos();
  }, []);

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const languages = ['all', ...Array.from(new Set(repos.map(repo => repo.language).filter(Boolean)))];

  if (loading) {
    return (
      <div className="space-y-6s">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">GitHub Repositories</h2>
          </div>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading repositories...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Github className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">GitHub Repositories</h2>
            <p className="text-gray-400 text-sm">{repos.length} repositories found</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Refresh</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-8 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 appearance-none cursor-pointer"
          >
            {languages.map(lang => (
              <option key={lang} value={lang} className="bg-gray-800">
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Repository Grid */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredRepos.map((repo, index) => (
            <GitHubRepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Github className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No repositories found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}