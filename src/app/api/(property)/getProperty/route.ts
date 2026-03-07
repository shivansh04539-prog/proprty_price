// import { connectDB } from "@/lib/mongodb";
// import { Properties } from "@/models/property/property";
// import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     await connectDB();

//     const Getall = await Properties.find({}).sort({ createdAt: -1 }); // ✅ newest first

//     return NextResponse.json({ status: 200, data: Getall });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: "Server error" });
//   }
// };
