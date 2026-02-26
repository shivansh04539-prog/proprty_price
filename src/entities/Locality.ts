import mongoose, { Schema, model, models } from "mongoose";

// 1. Modern Connection Logic (The "Trendy" Way)
// This checks if we are already connected (readyState 1) to avoid re-connecting.
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "propertyDB",
    });
    console.log("🚀 MongoDB Connected to propertyDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

// 2. Define Schema (Type-Safety & Structure)
// strict: false allows you to have other fields in DB without defining them all here
const localitySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    last_updated: { type: Date, default: Date.now },
    district: String,
    residential_plot_govt: Number,
    residential_plot_market: Number,
  },
  { timestamps: true, strict: false }
);

// 3. Singleton Model (Prevents "OverwriteModelError" in Next.js)
const LocalityModel = models.Locality || model("Locality", localitySchema);

// 4. The Class (Keeping your exact methods so nothing breaks)
export class Locality {
  static async list(orderBy?: string) {
    await connectDB();

    // .lean() makes it return plain JSON objects (much faster for SEO/Reading)
    let query = LocalityModel.find({}).lean();

    if (orderBy === "-updated_date") {
      query = query.sort({ last_updated: -1 });
    }

    const results = await query.exec();

    // Transform _id to string to match your old code's output
    return results.map(serializeDoc);
  }

  static async filter(query: { slug?: string }) {
    await connectDB();
    const results = await LocalityModel.find(query).lean().exec();
    return results.map(serializeDoc);
  }
}

// Helper to ensure data format stays consistent for your frontend
function serializeDoc(doc: any) {
  return {
    ...doc,
    _id: doc._id.toString(),
    last_updated: doc.last_updated
      ? new Date(doc.last_updated).toISOString()
      : null,
  };
}
