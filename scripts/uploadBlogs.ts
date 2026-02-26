// scripts/uploadBlogs.ts
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

// 1. Load environment variables BEFORE importing the DB connection
dotenv.config({ path: ".env.local" });

async function main() {
  try {
    console.log("Loading environment variables...");

    // 2. Dynamic import: This ensures MongoDB loads AFTER .env is read
    const { default: clientPromise } = await import("../src/lib/mongodb");

    const client = await clientPromise;
    const db = client.db("propertyDB");
    const blogs = db.collection("blogs");

    // 3. Read the JSON file
    const filePath = path.join(
      process.cwd(),
      "blogs",
      "saharanpur-web-devloper.json"
    );

    // Safety check: Does file exist?
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found at: ${filePath}`);
      process.exit(1);
    }

    const blogData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // 4. Check for duplicates
    const exists = await blogs.findOne({
      "post.metadata.slug": blogData.post.metadata.slug,
    });

    if (exists) {
      console.log(`⚠️ Blog already exists: ${blogData.post.metadata.slug}`);
      process.exit(0);
    }

    // 5. Insert
    const inserted = await blogs.insertOne(blogData);
    console.log("✅ Blog inserted successfully with ID:", inserted.insertedId);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error uploading blog:", err);
    process.exit(1);
  }
}

main();
