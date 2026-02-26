import { NextResponse } from "next/server";
import { Locality } from "@/entities/Locality";

// Force this route to be dynamic so we can read searchParams
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderBy = searchParams.get("orderBy");

    // 1. Fetch Data
    const localities = await Locality.list(orderBy || undefined);

    // 2. DATA PRUNING (Critical for Speed)
    // We create a "Lite" version. We only send the fields the Card needs.
    // This reduces JSON size by ~40-60%, making the site load much faster.
    const liteLocalities = localities.map((loc: any) => ({
      id: loc.id,
      name: loc.name,
      slug: loc.slug, // Crucial for SEO links
      district: loc.district,
      zones: loc.zones,
      last_updated: loc.last_updated,
      // Only send the prices we actually display
      residential_plot_govt: loc.residential_plot_govt,
      residential_plot_market: loc.residential_plot_market,
      commercial_shop_local_govt: loc.commercial_shop_local_govt,
      commercial_shop_local_market: loc.commercial_shop_local_market,
    }));

    // 3. CACHE HEADERS (The SEO Secret Weapon)
    // We tell the browser/CDN: "Keep this data fresh for 1 hour (3600s)."
    // "stale-while-revalidate" means: "If data is old, show the old data quickly while fetching new data in background."
    return NextResponse.json(liteLocalities, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        "Vercel-CDN-Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("API Error fetching localities:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
