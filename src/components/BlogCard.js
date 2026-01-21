import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSanityImageUrl } from "../../lib/sanity";
import { formatDate } from "../../lib/blogUtils";

const BlogCard = ({ blog }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/blogs/details?slug=${blog.slug.current}`)}
            className="group w-full flex max-xl:flex-col items-center gap-10 py-10 border-b border-[#484848] cursor-pointer"
        >
            {/* Image Section */}
            <div className="w-[35%] max-xl:w-full h-[250px] relative overflow-hidden rounded-2xl">
                <Image
                    src={
                        getSanityImageUrl(blog.mainImage) ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex justify-between items-center gap-6 w-full">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <p className="text-gray-500 text-sm font-light">
                        {formatDate(blog.publishedAt)}
                    </p>
                    <h3 className="text-3xl font-semibold text-white leading-tight  transition-colors duration-300">
                        {blog.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed line-clamp-2">
                        {blog.excerpt}
                    </p>
                </div>

                {/* Arrow Button */}
                <div className="max-xl:hidden min-w-[50px] min-h-[50px] rounded-full border border-[#FF773C] flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    >
                        <path
                            d="M5 12H19"
                            stroke="#FF773C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 5L19 12L12 19"
                            stroke="#FF773C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
