import mongoose from "mongoose";
import slugify from "slugify";

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Added as requested
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    type: {
      type: String,
      enum: ["for sale", "for rent"],
      required: true,
      index: true,
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    builtYear: { type: Number },
    address: { type: String, required: true },
    locality: { type: String, required: true, index: true },
    city: { type: String, required: true, index: true },
    images: [{ type: String }], // Note: You'll need a URL here from a service like Cloudinary
    status: {
      type: String,
      enum: ["available", "sold", "offmarket"],
      default: "available",
      index: true,
    },
    amenities: [{ type: String }],
  },
  { timestamps: true },
);

// Create slug before saving
PropertySchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    const baseSlug = slugify(
      `${this.bedrooms}bhk-house-${this.type}-in-${this.locality}-${this.city}`,
      { lower: true, strict: true },
    );

    // Add a small random string or timestamp to ensure it's always unique
    // This keeps the SEO keywords but prevents the "Duplicate" error
    const uniqueSuffix = Math.floor(Math.random() * 1000);
    this.slug = `${baseSlug}-${uniqueSuffix}`;
  }
  next();
});

export const Properties =
  mongoose.models.Properties || mongoose.model("Properties", PropertySchema);
//  `${this.bedrooms}bhk-house-${this.type}-in-${this.locality}-${this.city}`,
