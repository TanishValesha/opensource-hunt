import { auth } from "@/auth"; // adjust path if needed
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || !("accessToken" in session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.accessToken;
  try {
    const ghRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const data = await ghRes.json();
  return NextResponse.json({data: data}, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "GitHub API Error" }, { status: 500 });
  }
  
  
}
