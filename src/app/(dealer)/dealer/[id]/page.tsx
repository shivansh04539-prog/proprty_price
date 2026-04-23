// import { connectDB } from "@/lib/mongodb";
// import { Dealers } from "@/models/Dealer/dealer";
// import { Property } from "@/models/property/property"; // 1. Import your Property model
// // import PropertyCard from "@/components/PropertyCard"; 

// export default async function ParticualarDealer({ params }) {
//   await connectDB(); // 3. Always connect to the DB first

//   // 4. Find the specific dealer
//   const dealer = await Dealers.findOne({ slug: params.slug }).lean();

//   if (!dealer) {
//     return <div>Dealer not found</div>;
//   }

//   // 5. Find all properties belonging to this dealer
//   // Note: Ensure your Property model has a field like 'dealerId' or 'agent'
//   const dealerProperties = await Property.find({ dealerId: dealer._id }).lean();

//   // Convert for Next.js hydration
//   const safeProperties = JSON.parse(JSON.stringify(dealerProperties));

//   return (
//     <main className="min-h-screen bg-white py-20 px-6 max-w-7xl mx-auto">
//       {/* Dealer Header */}
//       <div className="bg-blue-600 p-10 flex flex-col items-center justify-center rounded-2xl text-white mb-12">
//         <h1 className="text-3xl font-bold">{dealer.name}</h1>
//         <p className="opacity-90">{dealer.email}</p>
//       </div>

//       {/* Properties Section */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-8 text-gray-800">
//           Listings by {dealer.name}
//         </h2>

//         {safeProperties.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* {safeProperties.map((property) => (
//               <PropertyCard key={property._id} property={property} />
//             ))} */}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
//             <p className="text-gray-500">No properties listed yet.</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


// app/dealer/[id]/page.tsx
// src/app/(dealer)/dealer/[id]/page.tsx
import { connectDB } from "@/lib/mongodb";
import { Dealers } from "@/models/Dealer/dealer";
import { notFound } from "next/navigation";
import Image from "next/image";

// 1. Change the type of params to a Promise
export default async function SingleAgentPage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  // 2. Await the params to get the ID
  const { id } = await params;

  // 3. Use the awaited 'id' in your Mongoose query
  const dealer = await Dealers.findById(id).lean();

  if (!dealer) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto border rounded-xl p-8 shadow-sm">
        
        {dealer.image && (
          <Image 
            src={dealer.image} 
            alt={dealer.name} 
            width={200} 
            height={200} 
            className="rounded-full mb-6"
          />
        )}

        <span className="px-4 py-1 mb-4 inline-block text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
          {dealer.city}, {dealer.area}
        </span>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{dealer.name}</h1>
        <p className="text-gray-500 mb-6">{dealer.email} • {dealer.phone}</p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About Agent</h2>
          <p className="text-gray-700 leading-relaxed">
            {dealer.bio || "This agent hasn't added a bio yet."}
          </p>
        </div>

      </div>
    </main>
  );
}