'use client'
import AllBlog from "./components/AllBlog";
import Banner from "./components/banner/Banner";
import TechLayout from "./components/technologySection/layout/TechLayout";
import Travel from "./components/travelSection/Travel";



export default function Home() {
  return (
    <div>
      <Banner />
      <Travel />
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-8">
          <TechLayout />
        </section>
        <aside className="col-span-4 mt-16">
          aside
        </aside>
      </div>
      <AllBlog />
    </div>
  );
}
