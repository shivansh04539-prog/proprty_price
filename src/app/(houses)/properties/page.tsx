"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Properties from "@/components/(properties)/Properties";
import { useState, useEffect } from "react";
import { getAllProperties } from "@/actions/(admin)/getPropertie/properties";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
  const [dbProperties, setDbProperties] = useState([]);

  const [selectedType, setSelectedType] = useState("Types");
  const [selectedPrice, setSelectedPrice] = useState("Price");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  const typeOptions = ["For Sale", "For Rent"];
  const priceOptions = ["₹10L - ₹20L", "₹20L - ₹50L", "₹50L+"];
  const locationOptions = ["Delhi", "Mumbai", "Saharanpur"];

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllProperties();
      setDbProperties(data);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 relative">
      {/* Hero Section */}
      <section className="md:max-w-6xl w-full px-4 mx-auto bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl h-[65vh] sm:h-[80vh] flex items-center justify-center flex-col space-y-6 md:space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        <span className="z-10 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-6 py-1.5 text-xs sm:text-sm font-medium tracking-wide">
          Properties
        </span>
        <div className="z-10 text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Find the right home in <br />
            <span className="font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-white to-green-400">
              Saharanpur
            </span>
          </h1>
        </div>
        <Link
          href="/#"
          className="z-10 bg-white text-blue-600 font-bold py-3 px-8 md:px-10 rounded-2xl shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95"
        >
          Book Now
        </Link>
      </section>

      {/* Search Bar Section */}
      <section className="px-2 sm:px-4">
        <div className="relative rounded-4xl flex flex-col md:flex-row max-w-4xl mx-auto gap-3 md:gap-4 -mt-12 md:-mt-8 bg-white z-50 py-5 px-5 md:py-4 md:px-6 shadow-2xl items-center">
          <div className="flex flex-col sm:flex-row w-full gap-3 md:w-auto">
            {/* Type Dropdown */}
            <div className="relative w-full md:w-40">
              <div
                onClick={() => toggleDropdown("type")}
                className="cursor-pointer px-4 py-2.5 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100 transition border border-gray-100 md:border-none"
              >
                <span className="text-gray-700 text-sm md:text-base">
                  {selectedType}
                </span>
                <span
                  className={`text-[10px] transition-transform ${openDropdown === "type" ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>
              <AnimatePresence>
                {openDropdown === "type" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-[60] border border-gray-100"
                  >
                    {typeOptions.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedType(item);
                          setOpenDropdown(null);
                        }}
                        className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Dropdown */}
            <div className="relative w-full md:w-40">
              <div
                onClick={() => toggleDropdown("price")}
                className="cursor-pointer px-4 py-2.5 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100 transition border border-gray-100 md:border-none"
              >
                <span className="text-gray-700 text-sm md:text-base">
                  {selectedPrice}
                </span>
                <span
                  className={`text-[10px] transition-transform ${openDropdown === "price" ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>
              <AnimatePresence>
                {openDropdown === "price" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-[60] border border-gray-100"
                  >
                    {priceOptions.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedPrice(item);
                          setOpenDropdown(null);
                        }}
                        className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Location Dropdown */}
            <div className="relative w-full md:w-40">
              <div
                onClick={() => toggleDropdown("location")}
                className="cursor-pointer px-4 py-2.5 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100 transition border border-gray-100 md:border-none"
              >
                <span className="text-gray-700 text-sm md:text-base">
                  {selectedLocation}
                </span>
                <span
                  className={`text-[10px] transition-transform ${openDropdown === "location" ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>
              <AnimatePresence>
                {openDropdown === "location" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-[60] border border-gray-100"
                  >
                    {locationOptions.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedLocation(item);
                          setOpenDropdown(null);
                        }}
                        className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by locality..."
              className="w-full px-4 py-3 md:py-2 pr-16 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-sm md:text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
              Go
            </button>
          </div>
        </div>
      </section>

      {/* Passing DB Data to Component */}
      <Properties
        dbData={dbProperties}
        values={{
          selectedType,
          selectedPrice,
          selectedLocation,
          searchValue: debouncedSearch,
        }}
      />
    </main>
  );
};

export default Page;
