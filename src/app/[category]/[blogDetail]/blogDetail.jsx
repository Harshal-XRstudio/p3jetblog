"use client";
import GoogleAds from "@/components/GoogleAds";
import { renderRichText } from "@/helper/helper";
import { getBlogDetails } from "@/services/blogDetailServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogDetailPage = ({ category, blogDetails }) => {
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <div className="max-w-4xl mx-auto px-4 py-12">
  //         <div className="animate-pulse">
  //           <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
  //           <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
  //           <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
  //           <div className="space-y-4">
  //             <div className="h-4 bg-gray-200 rounded"></div>
  //             <div className="h-4 bg-gray-200 rounded"></div>
  //             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  if (!blogDetails) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <section className="text-center" aria-label="Error message">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <nav aria-label="Navigation">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold">
              ← Back to Home
            </Link>
          </nav>
        </section>
      </main>
    );
  }

  const imageUrl = blogDetails?.heroImage?.url || "";
  const title = blogDetails?.heroTitle || "";
  const publishedBy = blogDetails?.publishedBy || "";
  const description = blogDetails?.heroDescription?.json;
  const richTextLinks = blogDetails?.heroDescription?.links;
  const blogCategory =
    category ||
    (Array.isArray(blogDetails?.category)
      ? blogDetails?.category[0]
      : blogDetails?.category) ||
    "Uncategorized";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      {blogDetails && (
        <>
          {imageUrl && (
            <header
              className="relative w-full h-96 md:h-[500px] overflow-hidden"
              role="banner">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-sm font-semibold px-4 py-2 rounded-full inline-block">
                      {blogCategory}
                    </span>
                  </div>
                  {title && (
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                      {title}
                    </h1>
                  )}
                  {publishedBy && (
                    <div className="flex items-center text-white/90 text-sm">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{publishedBy}</span>
                    </div>
                    )}
                </div>
              </div>
            </header>
          )}

          {/* Content Section */}
          <article className="max-w-4xl mx-auto px-4 py-12">
            {/* Header for non-hero layout */}
            {!imageUrl && (
              <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {blogCategory && (
                  <div className="mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold px-4 py-2 rounded-full">
                      {blogCategory}
                    </span>
                  </div>
                )}
                {title && (
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {title}
                  </h1>
                )}
                {publishedBy && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{publishedBy}</span>
                  </div>
                )}
              </header>
            )}

            {/* Rich Text Content */}
            <section className="prose prose-lg max-w-none dark:prose-invert">
              {description ? (
                <div className="text-gray-800 dark:text-gray-200">
                  {renderRichText(description, richTextLinks)}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No content available.
                </p>
              )}
            </section>

            {/* Back Button */}
            <nav
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              aria-label="Breadcrumb navigation">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blog Posts
              </Link>
            </nav>
          </article>
        </>
      )}
      <GoogleAds />
    </main>
  );
};

export default BlogDetailPage;
