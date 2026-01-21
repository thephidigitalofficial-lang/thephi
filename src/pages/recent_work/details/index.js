import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecentWork from "@/components/RecentWork";
import Image from "next/image";
import React from "react";
import Head from "next/head";
import projects from '../../../data/caseStudy.json'
import { useRouter } from "next/router";


const BorderedCard = ({ title, value }) => {
  return (
    <div
      className="
                  rounded-xl  border border-[1px] border-[#484848]
                  flex items-center   p-5 justify-between mb-3"
    >
      <span className="text-2xl font-medium  text-white">{title}</span>
      <span className="text-xl font-regular text-end max-xl:max-w-50 text-white">
        {value}
      </span>
    </div>
  );
};

function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;

  const projectDetail = React.useMemo(() => {
    if (!id) return {};
    return projects.find((project) => project.id == id) || {};
  }, [id]);

  console.log(projectDetail)
  console.log(id)

  return (
    <div className="bg-[#00000D]">
      <Head>
        <title>Project Details | The Phi Portfolio</title>
        <meta name="description" content="Detailed look at our creative process and engineered digital solutions for our clients." />
        <meta property="og:title" content="Project Details | The Phi Portfolio" />
        <meta property="og:description" content="Detailed look at our creative process and engineered digital solutions for our clients." />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <div>
        <div className="min-h-screen bg-gradient-to-b mt-30   text-white  ">
          <div className=" px-[60px] max-xl:px-6">
            <div className="rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] my-10">

              <Image
                height={0}
                width={0}
                src={projectDetail?.image}
                alt="project hero"
                className="w-full  rounded-2xl bg-red-300 z-2 h-[calc(100vh-120px)] max-xl:h-1/2 object-cover   block"
              />
            </div>

            <div className="relative">
              <div className="moveRadial xl:-top-30 max-xl:-top-0 xl:left-[40%] h-full min-w-80 max-w-full" />
              <div className="radial animate  top-150 h-full min-w-80 max-w-full" />

              <div className="absolute h-full left-[50%] max-w-full pt-12 max-xl:hidden">
                <div className="relative h-[30%]     ">
                  <div className="  moveRadial inset-0 max-w-[500px] h-full mx-auto" />
                </div>

                <div className="relative h-[50%]     ">
                  <div className=" overflow-hidden radial inset-0 max-w-2/3 min-h-screen mx-auto" />
                </div>
              </div>
              <main className="grid grid-cols-1 lg:grid-cols-2 xl:gap-36  mt-24  max-xl:mt-0 relative">
                <section>
                  <h1 className="text-[60px] max-xl:text-[30px] font-medium mb-6">
                    {projectDetail.title}  <br />
                    <span className="text-4xl">{projectDetail?.subtitle}</span>
                  </h1>


                  <p className="text-white font-regular text-base leading-relaxed mb-8">

                    {projectDetail?.description}
                  </p>
                </section>

                <section className="xl:mt-54">
                  <div className="flex flex-col gap-y-[20px]">
                    <BorderedCard title={"Role"} value={projectDetail?.skills} />
                    <BorderedCard
                      title={"Project Duration"}
                      value={projectDetail?.status}
                    />
                    <BorderedCard
                      title={"Solutions"}
                      value={projectDetail?.technology}
                    />
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>

        <RecentWork
          rounedEdges=""
          containerClass="relative bg-gradient-to-b overflow-hidden  pt-30  "
          showMoreBtn={false}
          showTimeLine={false}
          showPortFolio={false}
        />

        <Footer />
      </div>
    </div>
  );
}

export default ProjectDetails;
