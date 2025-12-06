import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "birthday";
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${accessKey}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
