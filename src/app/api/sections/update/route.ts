import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sectionId, title, description, content } = body;

    // Update section title and description
    const { error: sectionError } = await supabase
      .from("sections")
      .update({
        title,
        description,
      })
      .eq("id", sectionId);

    if (sectionError) {
      console.error("Error updating section:", sectionError);
      return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
    }

    // Delete existing content blocks
    const { error: deleteError } = await supabase
      .from("section_content")
      .delete()
      .eq("section_id", sectionId);

    if (deleteError) {
      console.error("Error deleting content:", deleteError);
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }

    // Insert new content blocks
    if (content && content.length > 0) {
      const contentBlocks = content.map((block: { heading: string; body_text: string }, index: number) => ({
        section_id: sectionId,
        heading: block.heading || null,
        body_text: block.body_text || null,
        order: index,
      }));

      const { error: insertError } = await supabase
        .from("section_content")
        .insert(contentBlocks);

      if (insertError) {
        console.error("Error inserting content:", insertError);
        return NextResponse.json({ error: "Failed to insert content" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
