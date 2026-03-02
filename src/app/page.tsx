import SearchableLocalities from "@/components/home/SearchableLocalities";
import Link from "next/link";
import React from "react";

// ✅ Unified Interface: Keeps your LocalityCard and API in sync
export interface Locality {
  _id: string;
  name: string;
  district: string;
  tehsil: string;
  slug: string;
  residential_plot_govt: number;
  residential_plot_market: number;
  last_updated: string | null;
}

async function getLocalities(page: number, city: string) {
  // Use 127.0.0.1 instead of localhost to avoid some Node.js DNS issues
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";
  const apiUrl = `${baseUrl}/api/localities?page=${page}&limit=20&city=${city}`;

  console.log(`🌐 Page fetching from: ${apiUrl}`);

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API responded with ${res.status}: ${errorText}`);
      throw new Error(`API Error ${res.status}`);
    }

    const json = await res.json();
    console.log(`✅ Page received ${json.data?.length} items`);
    return json;
  } catch (error) {
    console.error("❌ Fetch Error in getLocalities:", error);
    return { data: [], pagination: { totalPages: 1, page: 1 } };
  }
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; city?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const currentCity = params.city || "Saharanpur";

  const response = await getLocalities(currentPage, currentCity);
  const localities = response.data || [];
  const pagination = response.pagination || { page: 1, totalPages: 1 };

  // Placeholder for your SEO JsonLd
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Property Rates in ${currentCity}`,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Property Rates Directory
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Comprehensive directory for{" "}
          <span className="text-blue-600 font-bold">Saharanpur</span> and{" "}
          <span className="text-blue-600 font-bold">Noida</span>.
        </p>

        <SearchableLocalities
          localities={localities}
          initialCity={currentCity}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12 mb-8">
        {currentPage > 1 && (
          <Link
            href={`/?page=${currentPage - 1}&city=${currentCity}`}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            ← Previous
          </Link>
        )}

        <span className="text-gray-600 font-medium">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        {currentPage < pagination.totalPages && (
          <Link
            href={`/?page=${currentPage + 1}&city=${currentCity}`}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Next →
          </Link>
        )}
      </div>

      {/* Trending Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-3 w-3 rounded-full bg-blue-600 animate-pulse"></span>
          <h2 className="text-2xl font-bold text-gray-900">
            Trending in Noida (Jewar Airport)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/locality/yeida-sector-18-jewar"
            className="p-4 bg-white border border-blue-100 rounded-xl hover:shadow-md transition-shadow flex justify-between items-center group"
          >
            <div>
              <p className="font-bold text-gray-900 group-hover:text-blue-600">
                Sector 18 (YEIDA)
              </p>
              <p className="text-sm text-gray-500">
                Premium Airport Proximity Plots
              </p>
            </div>
            <span className="text-blue-600 font-semibold">View Rates →</span>
          </Link>
          <Link
            href="/locality/yeida-sector-20-jewar"
            className="p-4 bg-white border border-blue-100 rounded-xl hover:shadow-md transition-shadow flex justify-between items-center group"
          >
            <div>
              <p className="font-bold text-gray-900 group-hover:text-blue-600">
                Sector 20 (YEIDA)
              </p>
              <p className="text-sm text-gray-500">
                Fastest Growing Residential Zone
              </p>
            </div>
            <span className="text-blue-600 font-semibold">View Rates →</span>
          </Link>
        </div>
      </section>

      {/* Footer / Browse All */}
      <footer className="mt-20 pt-10 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
          Browse All Localities
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-h-[300px] overflow-y-auto px-2">
          {localities.map((loc: Locality) => (
            <Link
              key={loc.slug}
              href={`/locality/${loc.slug}`}
              className="text-xs text-slate-600 bg-slate-100 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              {loc.name} {loc.tehsil ? `(${loc.tehsil})` : ""}
            </Link>
          ))}
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
