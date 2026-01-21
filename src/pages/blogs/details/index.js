import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { getBlogBySlug, getRelatedBlogs, formatDate, toPlainText } from '../../../../lib/blogUtils'
import { getSanityImageUrl } from "../../../../lib/sanity";
import GradientButton from "@/components/GradientButton";
import Head from "next/head";

function BlogDetails({ blog, relatedBlogs }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div className="bg-[#00000D] min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if (!blog) {
        return <div className="bg-[#00000D] min-h-screen flex items-center justify-center text-white">Blog not found</div>;
    }

    const contentText = blog.content ? toPlainText(blog.content) : blog.excerpt;
    const ogImage = getSanityImageUrl(blog.mainImage) || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80";

    return (
        <div className="bg-[#00000D] min-h-screen text-white font-sans">
            <Head>
                <title>{`${blog.title} | The Phi Blog`}</title>
                <meta name="description" content={blog.excerpt || contentText.substring(0, 160)} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.excerpt || contentText.substring(0, 160)} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.excerpt || contentText.substring(0, 160)} />
                <meta name="twitter:image" content={ogImage} />
            </Head>
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <div className="container mx-auto px-6 lg:px-12 mb-16">
                    <div className="rounded-[30px] overflow-hidden shadow-2xl mb-12 h-[50vh] lg:h-[60vh] relative w-full">
                        <Image
                            src={getSanityImageUrl(blog.mainImage) || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Title & Meta */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-4xl lg:text-6xl font-medium mb-8 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-between border-y border-[#313131] py-6 text-gray-400 text-sm">
                            <p>{formatDate(blog.publishedAt)}</p>

                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                <span>Share</span>
                                <div className="flex gap-4">
                                    <button className="w-8 h-8 rounded-full border border-[#313131] flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                        <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14-3 0-4.9 1.8-4.9 5.2v2.8h-3v4h3v9h4.1v-9z" /></svg>
                                    </button>
                                    <button className="w-8 h-8 rounded-full border border-[#313131] flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                        <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </button>
                                    <button className="w-8 h-8 rounded-full border border-[#313131] flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                        <svg fill="currentColor" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <article className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                        {contentText}
                    </article>
                </div>

                {/* Latest Blogs Section */}
                <div className="border-t border-[#313131] mt-24">
                    <div className="container mx-auto px-6 lg:px-12 pt-20">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-medium">Latest Blogs</h2>
                            <div onClick={() => router.back()}>
                                <GradientButton text="View More" size="small" />
                            </div>

                            {/* <button

                                onClick={() => router.push('/blogs')}
                                className="px-6 py-2 rounded-full border border-[#FF773C] text-[#FF773C] text-sm hover:bg-[#FF773C] hover:text-white transition-all uppercase"
                            >
                                View More &rarr;
                            </button> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                                <div
                                    key={relatedBlog._id}
                                    onClick={() => router.push(`/blogs/details?slug=${relatedBlog.slug.current}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                                        <Image
                                            src={getSanityImageUrl(relatedBlog.mainImage) || "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"}
                                            alt={relatedBlog.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-xl font-medium group-hover:text-[#FF773C] transition-colors line-clamp-2">
                                        {relatedBlog.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}



export async function getServerSideProps({ query }) {
    try {
        const { slug } = query;
        console.log('Fetching blog with slug:', slug);
        const blog = await getBlogBySlug(slug);
        console.log('Blog found:', blog ? 'Yes' : 'No');

        if (!blog) {
            return {
                notFound: true,
            };
        }

        const categoryId = blog.category?._id;
        const relatedBlogs = categoryId ? await getRelatedBlogs(categoryId, blog._id, 4) : [];

        console.log('Related blogs:', relatedBlogs);
        return {
            props: {
                blog,
                relatedBlogs: relatedBlogs || [],
            },
        };
    } catch (error) {
        console.error('Error fetching blog:', error);
        return {
            notFound: true,
        };
    }
}

export default BlogDetails;
