import { cacheJSON } from '../cache';

const GQL_ENDPOINT = 'https://api.github.com/graphql';

export async function getMostStarredRepos(token: string) {
  return cacheJSON(
    'mostStarred:gql:v1',
    process.env.NODE_ENV === 'production' ? 60 * 60 * 12 : 60,
    async () => {
      const query = `
        query MostStarred($query: String!, $first: Int!) {
          search(query: $query, type: REPOSITORY, first: $first) {
            nodes {
              ... on Repository {
                id
                nameWithOwner
                description
                url
                primaryLanguage { name }
                stargazerCount
                forkCount
                watchers { totalCount }
                createdAt
                updatedAt
                diskUsage
                isPrivate
                repositoryTopics(first: 10) {
                  nodes { topic { name } }
                }
                openIssues: issues(states: OPEN) {
                  totalCount
                }
              }
            }
          }
        }`;

      const body = JSON.stringify({
        query,
        variables: {
          query: 'archived:false is:public has:license fork:false sort:stars',
          first: 100,
        },
      });

      const res = await fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          'User-Agent': 'oss-hunt-app',
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`GitHub GraphQL error ${res.status}: ${err}`);
      }

      const json = await res.json();

      const repos = json.data.search.nodes.map((r: any) => ({
        id: r.id,
        name: r.nameWithOwner,
        description: r.description,
        url: r.url,
        language: r.primaryLanguage?.name ?? null,
        stars: r.stargazerCount,
        forks: r.forkCount,
        watchers: r.watchers.totalCount,
        open_issue_count: r.openIssues.totalCount,
        created_at: r.createdAt,
        updated_at: r.updatedAt,
        size: r.diskUsage,
        isPrivate: r.isPrivate,
        topic: r.repositoryTopics.nodes.map((t: any) => t.topic.name),
      }));

      repos.sort((a: any, b: any) => b.stars - a.stars);

      return repos;
    }
  );
}
