// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { Blog } from "@/entities/Blog";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json(
        { message: "No blog data provided" },
        { status: 400 }
      );
    }

    await Blog.save(data);

    return NextResponse.json(
      { message: "Blogs saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving blogs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await Blog.list();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
