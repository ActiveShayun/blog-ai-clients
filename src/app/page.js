'use client'
import Banner from "./components/banner/Banner";
import Culture from "./components/culture/Culture";
import Followers from "./components/followUsSection/components/Followers";
import Latest from "./components/latestSection/Latest";
import Layout from "./components/lifeStyle/lifestyleLayout/Layout";
import Popular from "./components/popularSection/aside/Popular";
import TechLayout from "./components/technologySection/layout/TechLayout";
import Travel from "./components/travelSection/Travel";



export default function Home() {
  return (
    <div>
      <Banner />
      <Travel />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="col-span-8">
          <TechLayout />
          {/* lifestyle layout */}
          <Layout />
          {/* culture section */}
          <Culture />
        </section>
        <aside className="col-span-4 mt-16 border">
          <Followers />
          <Popular />
        </aside>
      </div>
      <Latest />
    </div>
  );
}
