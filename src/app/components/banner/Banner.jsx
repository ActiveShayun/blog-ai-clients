import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
// Import Swiper styles
import "swiper/css";
import GlobalApi from "@/app/globalApi/GlobalApi";
import Card from "./components/Card";



export default function App() {
    const [allData, isLoading, error] = GlobalApi()
    const lifeStyle = allData.filter(blog => blog?.category === 'lifeStyle').slice(0, 1)
    const business = allData.filter(blog => blog?.category === 'business').slice(0, 1)
    const sports = allData.filter(blog => blog?.category === "sports").slice(0, 1)
    const culture = allData.filter(blog => blog?.category === "culture").slice(0, 1)
    const travel = allData.filter(blog => blog?.category === "travel").slice(0, 1)
    const bannerBlog = [...lifeStyle, ...business, ...sports, ...culture, ...travel]
    console.log('bannerBlog', bannerBlog);

    return (
        <>
            <Swiper
                modules={[Navigation]}
                navigation={true}
                watchSlidesProgress={true}
                slidesPerView={3}
                className="mySwiper">
                {
                    bannerBlog?.map(blog => {
                        return <SwiperSlide>
                            <Card
                                key={blog._id}
                                title={blog.title}
                                category={blog.category}
                                blogBanner={blog.blogBanner}
                                _id={blog._id} />
                        </SwiperSlide>

                    })
                }
            </Swiper>
        </>
    );
}
