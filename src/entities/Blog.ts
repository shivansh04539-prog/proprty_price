import mongoose, { Schema, model, models } from "mongoose";

// 1. Connection Helper
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "propertyDB",
    });
    console.log("🚀 MongoDB Connected to propertyDB (Blogs)");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

// 2. Schema Definition (UPDATED)
const blogSchema = new Schema(
  {
    post: {
      metadata: {
        slug: { type: String, required: true, index: true },
        title: { type: String, required: true },
        category: String,
        tags: { type: [String], default: [] },
        publishDate: String,
        readTimeMinutes: Number,
        featuredImage: {
          url: String,
          altText: String,
        },
        summary: String,

        // 👇 NEW: Author Field (Safe for old posts too)
        author: {
          name: { type: String, default: "Shivansh" },
          url: { type: String, default: "https://saharanpurprice.in/about" },
        },
      },
      body: { type: Array, default: [] },
    },
  },
  { timestamps: true, strict: false }
);

// 3. Model Singleton
const BlogModel = models.Blog || model("Blog", blogSchema);

export class Blog {
  // Save one or multiple blogs
  static async save(blogData: any | any[]) {
    await connectDB();
    if (Array.isArray(blogData)) {
      await BlogModel.insertMany(blogData);
    } else {
      await BlogModel.create(blogData);
    }
    return { success: true };
  }

  // Get all blogs
  static async list() {
    await connectDB();
    const results = await BlogModel.find({})
      .sort({ "post.metadata.publishDate": -1 })
      .lean()
      .exec();
    return results.map(serializeDoc);
  }

  // Get one blog by slug
  static async getBySlug(slug: string) {
    await connectDB();
    const result = await BlogModel.findOne({
      "post.metadata.slug": slug,
    })
      .lean()
      .exec();
    if (!result) return null;
    return serializeDoc(result);
  }
}

function serializeDoc(doc: any) {
  return {
    ...doc,
    _id: doc._id.toString(),
    slug: doc.post?.metadata?.slug || null,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
  };
}
