"use server";
import { Properties } from "@/models/property/property";
import { connectDB } from "@/lib/mongodb";

// ✅ Required for Next.js Server Actions

// Make sure your imports for connectDB and Properties model are here

export async function getAllProperties() {
  try {
    await connectDB();

    // Fetch from MongoDB
    const properties = await Properties.find({}).sort({ createdAt: -1 });

    // ✅ Convert Mongoose documents to plain JS objects (fixes Next.js hydration issues)
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return []; // Return an empty array on error so the page doesn't crash
  }
}

export const getParticularData = async (slug: string) => {
  try {
    await connectDB();

    // Use findOne to get a single object, not an array
    // .lean() makes the data a plain JS object (better for Next.js)
    const findProperty = await Properties.findOne({ slug }).lean();

    if (!findProperty) {
      console.log("No property found with slug:", slug);
      return null;
    }

    // Convert MongoDB _id to string to avoid serialization errors
    return JSON.parse(JSON.stringify(findProperty));
  } catch (error) {
    console.log(error);
  }
};
