"use client";
import { textToSlug } from "@/helper/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const BlogSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
        {/* Category badge skeleton */}
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          {/* <div className='h-6 bg-gray-200 rounded w-1/2'></div> */}
        </div>
        {/* Description skeleton */}
        <div className="mb-4 flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          {/* <div className='h-4 bg-gray-200 rounded w-5/6'></div> */}
        </div>
        {/* Read More skeleton */}
        <div className="flex items-center mt-auto">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded ml-2"></div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ blogPosts }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Adsense error:", e);
    }
  }, []);
  return (
    <main className="mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          {/* <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2'> Blog Posts</h1> */}
          {/* <p className='text-gray-600 dark:text-gray-400'>Discover our latest articles and insights</p> */}
        </header>
        {false ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : blogPosts?.length === 0 ? (
          <section
            className="flex justify-center items-center py-20"
            aria-label="Empty state">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found.
            </p>
          </section>
        ) : (
          <section
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            aria-label="Blog posts">
            {blogPosts?.map((blog) => {
              // Extract description text from JSON structure
              const getDescription = () => {
                try {
                  if (blog.heroDescription?.json?.content) {
                    const content = blog.heroDescription.json.content;
                    if (Array.isArray(content) && content.length > 0) {
                      return (
                        content[0]?.value ||
                        content[0]?.content?.[0]?.value ||
                        ""
                      );
                    }
                  }
                  return "";
                } catch (error) {
                  return "";
                }
              };

              const title = blog?.heroTitle || "";
              const description = getDescription();
              const category = Array.isArray(blog?.category)
                ? blog?.category[0]
                : blog?.category || "";
              const imageUrl = blog?.heroImage?.url || "";
              const blogId = textToSlug(title);
              const categorySlug = textToSlug(category);

              return (
                <article
                  key={blogId}
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-all duration-300 transform flex flex-col">
                  <Link
                    href={`/${categorySlug}/${blogId}`}
                    className="flex flex-col h-full"
                    prefetch={false}>
                    {imageUrl && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-300"
                        />
                        {category && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                              {category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-3 flex-1 flex flex-col">
                      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3 flex-1">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-500 mt-auto">
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </section>
        )}
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2234384779164146"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"></ins>
    </main>
  );
};

export default HomePage;
