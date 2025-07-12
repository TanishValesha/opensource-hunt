import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { GoodFirstRepo } from '@/app/types/Good_First_Issue_Repo_Type';
import { getMostStarredRepos } from '@/lib/fetcher/GH_mostStarred';

export async function GET() {
  const session = await auth();

  // Use the same check as your working route
  if (!session || !("accessToken" in session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const accessToken = session.accessToken;
  console.log('AccessToken present:', !!accessToken);
  
  try {
    const data: GoodFirstRepo[] = await getMostStarredRepos(accessToken);
    return NextResponse.json({repoCount: data.length, data});
  } catch (error) {
    console.error('Error fetching repos:', error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}