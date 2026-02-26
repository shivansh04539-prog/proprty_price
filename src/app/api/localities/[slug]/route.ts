import { NextResponse } from "next/server";
import { Locality } from "@/entities/Locality";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const localities = await Locality.filter({ slug });

    if (!localities || localities.length === 0) {
      return NextResponse.json(
        { message: `Locality with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    // ✅ OPTIMIZATION: Return the response with Cache-Control headers
    return NextResponse.json(localities[0], {
      status: 200,
      headers: {
        // "s-maxage=3600": Cache on the CDN (Vercel) for 1 hour.
        // "stale-while-revalidate=59": If cache is old, show old data quickly while fetching new data in background.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        "Vercel-CDN-Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("API Error fetching locality:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
