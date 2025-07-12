import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || !("accessToken" in session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const accessToken = session.accessToken;
  console.log(accessToken);
  try {
    const ghRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const data = await ghRes.json();
  const filteredData = {
      login: data.login,
      id: data.id,
      avatar_url: data.avatar_url,
      url: data.url,
      html_url: data.html_url,
      followers_url: data.followers_url,
      following_url: data.following_url,
      name: data.name,
    };

  return NextResponse.json({data: filteredData}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "GitHub API Error" }, { status: 500 });
  }
  
  
}
