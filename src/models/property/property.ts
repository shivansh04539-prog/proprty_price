import mongoose from "mongoose";
import slugify from "slugify";

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
   description: { type: String, required: false },
    price: { type: Number, required: true, index: true },
    type: { type: String, enum: ["for sale", "for rent"], required: true, index: true },
   bedrooms: { type: Number, required: false },
  bathrooms: { type: Number, required: false },
    area: { type: Number, required: true },
 builtYear: { type: Number, required: false },
    address: { type: String, required: true },
    locality: { type: String, required: true, index: true },
    city: { type: String, required: true, index: true },
    images: [{ type: String }],
    front: { type: String, required: false },
   frontRoadWidth: { type: String, required: false },
    status: { type: String, enum: ["available", "sold", "offmarket"], default: "available", index: true },
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

PropertySchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    // Fallback if bedrooms is missing: use 'property' instead of '0bhk'
    const bhkPart = this.bedrooms ? `${this.bedrooms}bhk` : "property";
    const baseSlug = slugify(
      `${bhkPart}-${this.type}-in-${this.locality}-${this.city}`,
      { lower: true, strict: true }
    );
    const uniqueSuffix = Math.floor(Math.random() * 1000);
    this.slug = `${baseSlug}-${uniqueSuffix}`;
  }
  next();
});

export const Properties =
  mongoose.models.Properties || mongoose.model("Properties", PropertySchema);
//  `${this.bedrooms}bhk-house-${this.type}-in-${this.locality}-${this.city}`,
