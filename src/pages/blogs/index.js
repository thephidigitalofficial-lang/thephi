import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getAllBlogs, formatDate } from "../../../lib/blogUtils";
import { ReactFitty } from "react-fitty";
import { useSelector } from "react-redux";
import Head from "next/head";

function Blogs({
  rounedEdges = "rounded-t-[50px]",
  showTimeLine = true,
  showPortFolio = true,
  containerClass = "relative  glassWrapper border-b border-b-[#30303D]/30    border-b-1",
  blogs = [],
}) {


  const { showChatDialog: showChatBot } = useSelector(
    (state) => state.chatSlice
  );
  const ref = useRef(null);


  return (
    <div>

      <div ref={ref} className={`${rounedEdges}  ${containerClass}    `}>
        {containerClass.includes("glass") ? (
          <div className="glassStrip z-10" />
        ) : (
          <div className="pt-24" />
        )}

        {showPortFolio && (
          <div className="z-10 ">
            <motion.div
              transition={{ duration: 2 }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center font-bold uppercase   z-10   -top-32 relative bg-[#302A28]
    bg-clip-text text-transparent  
    [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_65%)]
    [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_74%)]
    [mask-repeat:no-repeat] [mask-size:100%_100%]
    [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%] text-[220px]  
     mt-12"
            >

              <span className="max-lg:hidden">BLOG</span>
              <div className="hidden max-lg:block">
                <ReactFitty key={showChatBot}>BLOG</ReactFitty>
              </div>

            </motion.div>
          </div>
        )}


        <div
          ref={ref}
          className="z-11 text-white min-h-screen  px-16 max-xl:px-6  relative pb-20 w-full "
        >
          <div className=" -mt-40 z-10 flex flex-col  xl:mx-auto    ">
            <h2 className="text-3xl lg:text-5xl font-medium -mt-20 mb-16 ">
              Our Blog
            </h2>

            <div className="  -mt-6">
              <div className="flex flex-col gap-6 relative z-10  border-t border-[#484848]">
                {blogs.map((blog, index) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div >
  );
}

export default function App({ blogs = [] }) {
  return <div className="bg-[#00000D] ">
    <Head>
      <title>Our Blog | The Phi</title>
      <meta name="description" content="Insights, stories, and engineered extraordinary experiences from The Phi team." />
      <meta property="og:title" content="Our Blog | The Phi" />
      <meta property="og:description" content="Insights, stories, and engineered extraordinary experiences from The Phi team." />
      <meta property="og:type" content="website" />
    </Head>
    <div className="relative space-y-20 ">
      <div className="absolute top-4 z-20 w-full ">
        <Header />
      </div>
      <div className="moveRadial xl:-top-62 max-xl:-top-0 xl:left-[40%] left-[14%]   h-full min-w-80 max-w-full" />

      <Blogs
        containerClass="relative   border-b border-b-[#30303D]/30   pb-2 border-b-2 max-w-full overflow-hidden"
        rounedEdges="rounded-[0px]"
        showMoreBtn={false}
        blogs={blogs}
      />
      <Footer />
    </div>
  </div>
}

export async function getStaticProps() {
  try {
    const blogs = await getAllBlogs();

    return {
      props: {
        blogs: blogs || [],
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: {
        blogs: [],
      },
      revalidate: 60,
    };
  }
}