import React from "react";
import BlogDetailPage from "./blogDetail";
import { getBlogDetails } from "@/services/blogDetailServices";
import { getAllBlogPosts } from "@/services/blogServices";
import { textToSlug } from "@/helper/helper";

export const dynamic = "force-static"; // ✅ For static export
export const revalidate = false;

// ✅ Correct function name and structure
export async function generateStaticParams() {
  try {
    const blogPosts = await getAllBlogPosts({ preview: true });

    if (!Array.isArray(blogPosts)) return [];

    return blogPosts
      .map((blog) => {
        const blogSlug = blog?.slug || textToSlug(blog?.heroTitle || "");
        const category = Array.isArray(blog?.category)
          ? blog.category[0]
          : blog.category;
        const categorySlug = textToSlug(category || "");

        if (!blogSlug || !categorySlug) return null;

        return {
          category: categorySlug,
          blogDetail: blogSlug,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}

async function getBlogDetailsData(blogSlug) {
  try {
    return await getBlogDetails({ slug: blogSlug, preview: true });
  } catch (err) {
    console.error("Error fetching blog details:", err);
    return null;
  }
}

export default async function BlogDetails({ params }) {
  const { category, blogDetail } = await params;
  console.log("category", category);
  console.log("blogDetail", blogDetail);
  const blogDetails = await getBlogDetailsData(blogDetail);

  return <BlogDetailPage category={category} blogDetails={blogDetails} />;
}
