"use client";
import PropUpload from "@/actions/propUpload/prop.actions";
import React, { useState } from "react";
import { LuImageUp } from "react-icons/lu";

const AddPropertyPage = () => {
  const amenitiesList = [
    "Swimming Pool",
    "Parking",
    "Garden",
    "North Facing",
    "West Facing",
  ];
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Start Loading
    setIsSubmitting(true);

    const formdata = new FormData(e.target);

    if (!formdata.get("title") || !formdata.get("name")) {
      alert("Please fill in the Name and Title");
      setIsSubmitting(false); // Stop loading if validation fails
      return;
    }
    try {
      const response = await PropUpload(formdata);

      if (response.status === 201) {
        alert("Property Added Successfully!");
        e.target.reset();
        setSelectedAmenities([]);
      } else if (response.status === 400) {
        alert("Validation Error. Check console.");
      } else {
        // This is where your Duplicate Key error ends up
        alert("Error: This property title might already exist.");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      // 3. Always stop loading at the end
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          Add New Property
        </h1>

        <form className="grid lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {/* LEFT SIDE: Core Details */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Property Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Owner/Dealer Name"
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                name="title"
                type="text"
                placeholder="Property Title (e.g. Luxury 3BHK Villa)"
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <input
              name="address"
              type="text"
              placeholder="Full Address"
              className="p-3 border rounded-lg w-full"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <select name="city" className="p-3 border rounded-lg w-full">
                <option value="Saharanpur">Saharanpur</option>
                <option value="Noida">Noida</option>
              </select>
              <input
                name="locality"
                type="text"
                placeholder="Locality"
                required
                className="p-3 border rounded-lg w-full"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                placeholder="Price (₹)"
                className="p-3 border rounded-lg w-full"
                required
              />
              <select name="type" className="p-3 border rounded-lg w-full">
                <option value="for sale">For Sale</option>
                <option value="for rent">For Rent</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="area"
                type="number"
                placeholder="Area (sq.ft)"
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                name="bedrooms"
                type="number"
                placeholder="Bedrooms"
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                name="bathrooms"
                type="number"
                placeholder="Bathrooms"
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="builtYear"
                type="number"
                placeholder="Built Year"
                required
                className="p-3 border rounded-lg w-full"
              />
              <select name="status" className="p-3 border rounded-lg w-full">
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="offmarket">Off Market</option>
              </select>
            </div>

            <textarea
              name="description"
              rows={5}
              placeholder="Describe the property..."
              required
              className="p-3 border rounded-lg w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting} // 4. Disable the button
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg text-lg"
            >
              {isSubmitting ? "Uploading Images..." : "List Property"}
            </button>
          </section>

          {/* RIGHT SIDE: Media & Amenities */}
          <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6 h-fit">
            <h2 className="text-xl font-semibold border-b pb-2">
              Media & Extras
            </h2>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">
                Property Images
              </p>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl h-40 cursor-pointer hover:bg-blue-50 transition">
                <LuImageUp size={28} className="text-blue-600 mb-2" />
                <p className="text-gray-600 text-sm">
                  {selectedFilesCount > 0
                    ? `${selectedFilesCount} files selected`
                    : "Upload Photos"}
                </p>
                <input
                  type="file"
                  name="images"
                  multiple
                  hidden
                  onChange={(e) => setSelectedFilesCount(e.target.files.length)}
                />
              </label>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-1 gap-2">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition
                  ${selectedAmenities.includes(amenity) ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 border-gray-200"}`}
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      className="hidden"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
};

export default AddPropertyPage;
