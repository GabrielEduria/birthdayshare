import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
  const { slug } = params;

  const { data, error } = await supabaseAdmin
    .from("cards")
    .select("data")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Card not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: data.data });
}
