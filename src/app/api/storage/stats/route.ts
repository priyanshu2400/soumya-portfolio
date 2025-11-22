import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // List all files in the portfolio-images bucket
    const { data: files, error: listError } = await supabase
      .storage
      .from("portfolio-images")
      .list("", {
        limit: 1000,
        sortBy: { column: "name", order: "asc" },
      });

    if (listError) {
      console.error("Error listing files:", listError);
      return NextResponse.json({ error: "Failed to fetch storage stats" }, { status: 500 });
    }

    // Calculate total size by getting file metadata
    let totalSize = 0;
    let fileCount = 0;

    if (files) {
      // Get all folder names (section IDs)
      const folders = files.filter(item => item.id === null);
      
      for (const folder of folders) {
        const { data: folderFiles } = await supabase
          .storage
          .from("portfolio-images")
          .list(folder.name, {
            limit: 1000,
          });

        if (folderFiles) {
          folderFiles.forEach(file => {
            if (file.metadata && typeof file.metadata.size === 'number') {
              totalSize += file.metadata.size;
              fileCount++;
            }
          });
        }
      }
    }

    // Supabase free tier: 1GB (1,073,741,824 bytes)
    const maxStorage = 1073741824; // 1GB in bytes
    const usedPercentage = (totalSize / maxStorage) * 100;
    const remainingBytes = maxStorage - totalSize;

    return NextResponse.json({
      totalSize,
      maxStorage,
      usedPercentage: Math.round(usedPercentage * 10) / 10,
      remainingBytes,
      fileCount,
      formattedUsed: formatBytes(totalSize),
      formattedMax: formatBytes(maxStorage),
      formattedRemaining: formatBytes(remainingBytes),
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
