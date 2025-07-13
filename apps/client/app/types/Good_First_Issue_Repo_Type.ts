export interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  watchers: number;
  created_at: string;
  updated_at: string;
  size: number;
  open_issue_count: number;
  isPrivate: boolean;
  topic: string[];
  goodFirstIssues?: number;
  hacktoberfestIssues?: number
}
