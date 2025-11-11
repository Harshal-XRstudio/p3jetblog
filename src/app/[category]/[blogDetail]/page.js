import React from "react";
import BlogDetailPage from "./blogDetail";
import { getBlogDetails } from "@/services/blogDetailServices";
import { getAllBlogPosts, getBlogsByCategory } from "@/services/blogServices";
import { textToSlug } from "@/helper/helper";

export const dynamic = "force-dynamic"; // ✅ For static export
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

export default async function BlogDetails({ params, searchParams }) {
  const { category, blogDetail } = await params;
  
  // Extract and clean lng parameter
  let lng = searchParams?.lng || null;
  if (lng) {
    // Remove quotes if present (handles %22en-US%22 -> en-US)
    lng = lng.replace(/^["']|["']$/g, '').trim();
  }
  const language = lng || "en-US";
  
  console.log('lng=========>', decodeURIComponent(language));
  
  const blogDetails = await getBlogDetailsData(blogDetail);

  // Get related articles from the same category
  const blogCategory = blogDetails?.category
    ? Array.isArray(blogDetails.category)
      ? blogDetails.category[0]
      : blogDetails.category
    : category;

  const relatedArticles = await getBlogsByCategory({
    category: blogCategory,
    excludeSlug: blogDetail,
    limit: 3,
    preview: true,
    lng: language,
  });

  return (
    <BlogDetailPage
      category={category}
      blogDetails={blogDetails}
      relatedArticles={relatedArticles}
    />
  );
}
