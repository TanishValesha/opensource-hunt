import { motion } from 'framer-motion';
import {
  Star,
  GitFork,
  Eye,
  Code,
  ExternalLink,
  Zap,
  CircleDot
} from 'lucide-react';
import { GoodFirstRepo } from '@/app/types/Good_First_Issue_Repo_Type';


interface GitHubRepoCardProps {
  repo: GoodFirstRepo;
  index: number;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#1572B6',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Angular: '#DD0031',
  Svelte: '#ff3e00',
};


const formatSize = (kb: number): string => {
  if (kb === 0) return '0 KB';
  const sizes = ['KB', 'MB', 'GB'];
  let i = 0;
  while (kb >= 1024 && i < sizes.length - 1) {
    kb = kb / 1024;
    i++;
  }
  return kb.toFixed(1) + ' ' + sizes[i];
};


export default function GitHubRepoCard({ repo, index }: GitHubRepoCardProps) {
  const languageColor = repo.language ? languageColors[repo.language] || '#8b949e' : '#8b949e';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      {/* Main card */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              {repo.isPrivate && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-900"></div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-200">
                {repo.name}
              </h3>
            </div>
          </div>

          <motion.a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-200" />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {repo.description || 'No description available'}
        </p>

        {/* Topics */}
        {repo.topic && repo.topic.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topic.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20"
              >
                {t}
              </span>
            ))}
            {repo.topic.length > 3 && (
              <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-full border border-gray-500/20">
                +{repo.topic.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-500/10 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{repo.stars.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Stars</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <GitFork className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{repo.forks.toString()}</p>
              <p className="text-gray-400 text-xs">Forks</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <Eye className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{repo.watchers.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Watchers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-500/10 rounded-lg">
              <CircleDot className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{repo.open_issue_count.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Issues</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <CircleDot className="w-4 h-4 text-green-400" />
            </div>

            <div>
              <p className="text-white font-medium text-sm">{repo.goodFirstIssues.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Good First Issues</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-4">
            {repo.language && (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: languageColor }}
                ></div>
                <span className="text-gray-300 text-sm font-medium">{repo.language}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Zap className="w-3 h-3" />
              <span>{formatSize(repo.size)}</span>
            </div>
          </div>

          <div className="text-gray-400 text-xs">
            Created {new Date(repo.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}