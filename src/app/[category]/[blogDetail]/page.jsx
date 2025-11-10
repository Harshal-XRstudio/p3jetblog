import React from "react";
import BlogDetailPage from "./blogDetail";
import { getBlogDetails } from "@/services/blogDetailServices";
import { getAllBlogPosts } from "@/services/blogServices";
import { textToSlug } from "@/helper/helper";

// Force static generation - pages will be pre-rendered at build time
export const dynamic = "force-static";
export const revalidate = false; // Static pages, no revalidation

/**
 * Generate static params for all blog detail pages
 * Required for static export with dynamic routes
 * This function MUST be exported for Next.js static export to work
 */
export async function generateStaticParams() {
  // Ensure we always return an array, even if the API call fails
  let params = [];

  try {
    const blogPosts = await getAllBlogPosts({ preview: true });

    if (blogPosts && Array.isArray(blogPosts) && blogPosts.length > 0) {
      params = blogPosts
        .map((blog) => {
          // Use slug field from Contentful if available, otherwise generate from title
          const blogSlug = blog?.slug || (blog?.heroTitle ? textToSlug(blog.heroTitle) : null);
          const categoryValue = Array.isArray(blog?.category)
            ? blog?.category[0]
            : blog?.category;
          const categorySlug = categoryValue ? textToSlug(categoryValue) : null;

          // Only return valid params with both category and blogDetail as strings
          if (blogSlug && categorySlug && typeof blogSlug === 'string' && typeof categorySlug === 'string') {
            return {
              category: categorySlug,
              blogDetail: blogSlug,
            };
          }
          return null;
        })
        .filter((param) => param !== null && param !== undefined); // Remove null/undefined entries
    }
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array to allow build to continue
    params = [];
  }

  // Always return an array (never undefined or null)
  return Array.isArray(params) ? params : [];
}

const getBlogDetailsData = async ({ blogSlug }) => {
  try {
    const result = await getBlogDetails({ slug: blogSlug, preview: true });
    return result;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
};

const BlogDetails = async ({ params }) => {
  const { category, blogDetail } = await params;
  const blogDetails = await getBlogDetailsData({ blogSlug: blogDetail });
  return <BlogDetailPage category={category} blogDetails={blogDetails} />;
};

export default BlogDetails;
