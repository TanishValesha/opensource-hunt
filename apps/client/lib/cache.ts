import { redis } from "./redis";

export async function cacheJSON<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit) as T;

  const fresh = await fetcher();              
  await redis.setEx(key, ttl, JSON.stringify(fresh));
  return fresh;
}
