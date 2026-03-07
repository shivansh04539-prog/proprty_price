// import { connectDB } from "@/lib/mongodb";
// import { Properties } from "@/models/property/property";

// export const getParticularData = async (slug: string) => {
//   try {
//     await connectDB();

//     // Use findOne to get a single object, not an array
//     // .lean() makes the data a plain JS object (better for Next.js)
//     const findProperty = Properties.findOne({ slug }).lean();

//     if (!findProperty) return null;

//     // Convert MongoDB _id to string to avoid serialization errors
//     return JSON.parse(JSON.stringify(findProperty));
//   } catch (error) {
//     console.log(error);
//   }
// };
