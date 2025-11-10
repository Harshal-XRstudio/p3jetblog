import { getAllBlogPosts } from "@/services/blogServices";
import HomePage from "./home/homePage";

// Force static generation - pages will be pre-rendered at build time
export const dynamic = "force-static";
export const revalidate = false; // Static pages, no revalidation

const getAllBlogPostsData = async () => {
  try {
    const posts = await getAllBlogPosts({ preview: true });
    if (posts && Array.isArray(posts)) {
      return posts;
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export default async function Home() {
  const blogPosts = await getAllBlogPostsData();

  return <HomePage blogPosts={blogPosts} />;
}
