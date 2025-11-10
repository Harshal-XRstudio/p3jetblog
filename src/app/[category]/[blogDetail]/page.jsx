import React from "react";
import BlogDetailPage from "./blogDetail";
import { getBlogDetails } from "@/services/blogDetailServices";
import { getAllBlogPosts } from "@/services/blogServices";
import { textToSlug } from "@/helper/helper";

const getBlogDetailsData = async ({ blogSlug }) => {
  try {
    const result = await getBlogDetails({ slug: blogSlug, preview: true });
    return result;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
};

// Force static generation - pages will be pre-rendered at build time
export const dynamic = "force-static";
export const revalidate = false; // Static pages, no revalidation


const BlogDetails = async ({ params }) => {
  const { category, blogDetail } = await params;
  const blogDetails = await getBlogDetailsData({ blogSlug: blogDetail });
  return <BlogDetailPage category={category} blogDetails={blogDetails} />;
};

export async function generateStaticParams() {
  try {
    const blogPosts = await getAllBlogPosts({ preview: true });

    if (!blogPosts || !Array.isArray(blogPosts) || blogPosts.length === 0) {
      return [];
    }

    const params = blogPosts
      .map((blog) => {
        // Use slug field from Contentful if available, otherwise generate from title
        const blogSlug = blog?.slug || (blog?.heroTitle ? textToSlug(blog.heroTitle) : null);
        const categoryValue = Array.isArray(blog?.category)
          ? blog?.category[0]
          : blog?.category;
        const categorySlug = categoryValue ? textToSlug(categoryValue) : null;

        // Only return valid params with both category and blogDetail as strings
        if (blogSlug && categorySlug) {
          return {
            category: categorySlug,
            blogDetail: blogSlug,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null/undefined entries

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default BlogDetails;
