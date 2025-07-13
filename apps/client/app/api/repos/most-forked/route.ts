import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { GoodFirstRepo } from '@/app/types/Repo';
import { getMostStarredRepos } from '@/lib/fetcher/GH_mostStarred';
import { getMostForkedRepos } from '@/lib/fetcher/GH_mostForked';

export async function GET() {
  const session = await auth();

  // Use the same check as your working route
  if (!session || !("accessToken" in session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const accessToken = session.accessToken;
  console.log('AccessToken present:', !!accessToken);
  
  try {
    const data: GoodFirstRepo[] = await getMostForkedRepos(accessToken);
    return NextResponse.json({repoCount: data.length, data});
  } catch (error) {
    console.error('Error fetching repos:', error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}