/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { slug, canvasJson } = await req.json();

    const { data: existing } = await supabase
      .from("cards")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Slug already exists. Pick another one." }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cards")
      .insert({
        slug,
        data: canvasJson
      })
      .select("slug")
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return Response.json({ slug: data.slug });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
