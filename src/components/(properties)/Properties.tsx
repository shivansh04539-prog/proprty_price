"use client";
import React from "react";
import Image from "next/image";
import { FaLocationDot, FaBath, FaBed, FaRulerCombined } from "react-icons/fa6";
import Link from "next/link";

const Properties = ({ values, dbData }) => {
  const { selectedType, selectedPrice, selectedLocation, searchValue } = values;

  const priceRanges = {
    "₹10L - ₹20L": [1000000, 2000000],
    "₹20L - ₹50L": [2000000, 5000000],
    "₹50L+": [5000000, Infinity],
  };

  const filteredData = dbData.filter((prop) => {
    // 1. Match Type (Handling lowercase "for sale" vs "For Sale")
    const matchType =
      selectedType === "Types" ||
      prop.type?.toLowerCase() === selectedType.toLowerCase();

    // 2. Match City
    const matchLocation =
      selectedLocation === "Location" ||
      prop.city?.toLowerCase() === selectedLocation.toLowerCase();

    // 3. Match Search (Searching in locality/address)
    const matchSearch = prop.locality
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());

    // 4. Match Price
    const matchPrice =
      selectedPrice === "Price" ||
      (prop.price >= priceRanges[selectedPrice]?.[0] &&
        prop.price <= priceRanges[selectedPrice]?.[1]);

    return matchType && matchLocation && matchSearch && matchPrice;
  });

  return (
    <main className="min-h-screen mt-4">
      <section className="grid md:grid-cols-3 grid-cols-1 max-w-6xl mx-auto gap-6 rounded-xl">
        {filteredData.length > 0 ? (
          filteredData.map((prop, index) => (
            <Link
              href={`/properties/${prop.slug}`}
              key={prop._id || index}
              className="rounded-2xl transition overflow-hidden block border border-gray-100 hover:shadow-lg"
            >
              <div className="relative h-64 w-full p-2">
                {/* Fixed: Use images[0] because your DB has an array */}
                <Image
                  src={
                    prop.images && prop.images.length > 0
                      ? prop.images[0].startsWith("http")
                        ? prop.images[0]
                        : `/${prop.images[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={prop.title || "Property Image"}
                  fill
                  className="object-cover rounded-xl"
                />
                <p className="absolute top-3 left-3 bg-blue-600 text-white text-xs uppercase font-bold rounded-full px-3 py-1">
                  {prop.type}
                </p>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaLocationDot className="text-blue-600" />
                  {prop.city}
                </p>
                {/* Fixed: Changed prop.location to prop.locality */}
                <p className="text-lg font-semibold mt-1 truncate">
                  {prop.locality}
                </p>

                <p className="text-blue-600 font-bold text-xl mt-1">
                  ₹{(prop.price / 100000).toFixed(1)}L
                </p>

                <div className="flex divide-x text-gray-500 text-sm mt-3">
                  <p className="flex items-center gap-1 pr-3">
                    <FaBath />
                    {prop.bathrooms} Bath {/* Fixed: prop.bathrooms */}
                  </p>
                  <p className="flex items-center gap-1 px-3">
                    <FaBed />
                    {prop.bedrooms} Beds
                  </p>
                  <p className="flex items-center gap-1 pl-3">
                    <FaRulerCombined />
                    {prop.area} sq.ft
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No properties found in Saharanpur matching your criteria.
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="rounded-2xl shadow-md flex flex-col space-y-6 bg-blue-500 w-full px-4 md:px-32 h-[60vh] items-center justify-center mt-6">
        <p className="text-white text-2xl font-bold">Want to Book a Call?</p>
        <p className="text-2xl md:text-3xl tracking-wide text-center font-bold text-white">
          Ready to make your step in real <br /> estate? Book Now.
        </p>
        <Link
          href={"/properties"}
          className="bg-white px-4 py-2 rounded-xl font-semibold"
        >
          View Properties
        </Link>
      </section>
    </main>
  );
};

export default Properties;
