"use client";

import { useState, useEffect } from 'react';
import { Github, Search, Filter, Loader } from 'lucide-react';
import GitHubRepoCard from '../GitHubRepoCard';
import { Repo } from '@/app/types/Good_First_Issue_Repo_Type';


export default function GitHubReposHackGrid() {
    const [hackRepos, setHackRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('all');

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/repos/hacktoberfest", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                console.log(data);
                setHackRepos(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }

        }
        getUserData();
    }, [])


    const filteredRepos: Repo[] = hackRepos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
        return matchesSearch && matchesLanguage;
    });

    const languages = ['all', ...Array.from(new Set(hackRepos.map(repo => repo.language).filter(Boolean)))];

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-2 text-white ">
                <Loader className="w-7 h-7 animate-spin" />
                <p className='text-white'>This may take a while......</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Top 100 Most Forked Repositories </h2>
                    </div>
                </div>

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