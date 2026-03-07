"use server";
import { connectDB } from "@/lib/mongodb";
import { Properties } from "@/models/property/property";
import { z } from "zod";
// 1. ENSURE THIS IS UNCOMMENTED
import { uploadCloudinary } from "@/lib/cloudinary/cloudinary";

const propertySchema = z.object({
  name: z.string().min(2),
  title: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  locality: z.string().min(2),
  price: z.coerce.number().positive(),
  type: z.enum(["for sale", "for rent"]),
  area: z.coerce.number().positive(),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  builtYear: z.coerce.number(),
  status: z.enum(["available", "sold", "offmarket"]),
  description: z.string().min(10),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export default async function PropUpload(formData) {
  try {
    await connectDB();

    const files = formData.getAll("images");
    const uploadedImageUrls = [];

    for (const file of files) {
      if (file && typeof file === "object" && file.size > 0) {
        // Use the imported function
        const url = await uploadCloudinary(file);
        if (url) uploadedImageUrls.push(url);
      }
    }

    const rawData = {
      name: formData.get("name"),
      title: formData.get("title"),
      address: formData.get("address"),
      city: formData.get("city"),
      locality: formData.get("locality"),
      price: formData.get("price"),
      type: formData.get("type"),
      area: formData.get("area"),
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      builtYear: formData.get("builtYear"),
      status: formData.get("status"),
      description: formData.get("description"),
    };

    const amenities = formData.getAll("amenities");

    const validatedData = propertySchema.safeParse({
      ...rawData,
      amenities,
      images: uploadedImageUrls,
    });

    if (!validatedData.success) {
      return { status: 400, errors: validatedData.error.flatten().fieldErrors };
    }

    // This will now work because the slug unique suffix is handled in the Schema
    const property = await Properties.create(validatedData.data);

    return {
      status: 201,
      data: JSON.parse(JSON.stringify(property)),
    };
  } catch (error) {
    // Check if it's a Mongoose Duplicate Key Error
    if (error.code === 11000) {
      return {
        status: 409,
        message: "A property with this specific detail already exists.",
      };
    }
    console.error("Upload Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// 👉 For MongoDB long term →
// Always validate with Zod → then save result.data directly.
