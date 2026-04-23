import { Calendar, FileText, MapPin, Home } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { getAllProperties } from '@/actions/(admin)/getPropertie/properties';
import Image from "next/image";
import { FaLocationDot, FaBath, FaBed, FaRulerCombined } from "react-icons/fa6";

async function getLocalities() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/localities?limit=12`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function RelatedLocalities({ currentSlug }) {
  // 1. Fetch both datasets
  const allLocalities = await getLocalities();
  const allProperties = await getAllProperties();

  // 2. Filter and Slice to get exactly 3 items total
  // We take 2 properties and 1 related locality for a good mix
  const displayProperties = allProperties?.slice(0, 2) || [];
  const displayLocalities = allLocalities
    .filter((loc) => loc.slug !== currentSlug)
    .slice(0, 1);

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* Single Unified Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* RENDER PROPERTIES FIRST (2 Cards) */}
          {displayProperties.map((prop) => (
            <Link
              href={`/properties/${prop.slug}`}
              key={prop._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full p-2">
                <Image
                  src={prop.images?.[0]?.startsWith("http") ? prop.images[0] : `/${prop.images?.[0] || 'placeholder.jpg'}`}
                  alt={prop.title || "Property"}
                  fill
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                 
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] uppercase font-bold rounded-lg px-2 py-1">
                    {prop.type}
                    </span>
                </div>
              </div>

              <div className="p-4 flex-1">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <FaLocationDot className="text-blue-500" />
                  {prop.city}
                </div>
                <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {prop.title}
                </h3>
                <p className="text-blue-600 font-extrabold text-lg mt-1">
                  ₹{(prop.price / 100000).toFixed(1)}L
                </p>

                <div className="flex items-center justify-between text-gray-500 text-[11px] mt-4 pt-3 border-t border-gray-50">
                   <span className="flex items-center gap-1"><FaBed/> {prop.bedrooms || 0}</span>
                   <span className="flex items-center gap-1"><FaBath/> {prop.bathrooms || 0}</span>
                   <span className="flex items-center gap-1"><FaRulerCombined/> {prop.area} sqft</span>
                </div>
              </div>
            </Link>
          ))}

          {/* RENDER LOCALITY NEXT (1 Card) */}
         {displayLocalities.map((loc) => (
  <Link
    key={loc.slug}
    href={`/locality/${loc.slug}`}
    className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden"
  >
    {/* Decorative Background Element - Makes it look professional */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />

    <div className="relative z-10 flex items-center flex-col">
      {/* Icon Styling: The "Ring" Effect */}
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
        <MapPin className="text-white w-6 h-6" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {loc.name}
        </h3>
        
        {/* Badge for Area Type */}
        <div className="flex gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
            Saharanpur Area
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed pt-2">
          Explore official <span className="font-semibold text-gray-700">Circle Rates</span> and current market trends for residential plots in this locality.
        </p>
      </div>
    </div>

    {/* Footer Section */}
    <div className="relative z-10 mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
        <Calendar size={14} className="text-blue-400" />
        <span>Updated {loc.last_updated ? format(new Date(loc.last_updated), "MMM yyyy") : 'Recently'}</span>
      </div>
      
      <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">
        <span>View Rates</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </Link>
))}
        </div>
      </div>
    </section>
  );
}