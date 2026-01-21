import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecentWork from "@/components/RecentWork";
import React from "react";
import Head from "next/head";

function index() {
  return (
    <div className="bg-[#00000D] ">
      <Head>
        <title>Our Portfolio | The Phi</title>
        <meta name="description" content="Explore our latest work and engineered extraordinary digital experiences. Our portfolio showcases the best of The Phi's engineering." />
        <meta property="og:title" content="Our Portfolio | The Phi" />
        <meta property="og:description" content="Explore our latest work and engineered extraordinary digital experiences. Our portfolio showcases the best of The Phi's engineering." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="relative space-y-20 ">
        <div className="absolute top-4 z-20 w-full ">
          <Header />
        </div>
        <div className="moveRadial xl:-top-62 max-xl:-top-0 xl:left-[40%] left-[14%]   h-full min-w-80 max-w-full" />

        <RecentWork
          containerClass="relative   border-b border-b-[#30303D]/30   pb-2 border-b-2 max-w-full overflow-hidden"
          rounedEdges="rounded-[0px]"
          showMoreBtn={false}
          isPage={true}
        />
        <Footer />
      </div>
    </div>
  );
}

export default index;
