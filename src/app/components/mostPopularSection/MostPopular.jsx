import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Card from './PopularCard';
import SliderPrev from '@/components/shared/sliderButton/SliderPrev';
import SliderNext from '@/components/shared/sliderButton/SliderNext';
import GlobalApi from '@/app/globalApi/GlobalApi';
import AnimatedText from '@/components/shared/animateText/AnimateText';

export default function LandsCapeProducts() {
    const [allData, isLoading] = GlobalApi()
    const cultures = allData.filter(culture => culture.category === 'culture').slice(0, 1)
    const lifeStyles = allData.filter(culture => culture.category === 'lifeStyle').slice(0, 1)
    const sports = allData.filter(culture => culture.category === 'sports').slice(0, 1)
    const business = allData.filter(culture => culture.category === 'business').slice(0, 1)
    const travel = allData.filter(culture => culture.category === 'travel').slice(0, 1)
    const data = [...cultures, ...lifeStyles, ...sports, ...business, ...travel];
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const [isBeginning, setBeginning] = useState(true)
    const [isEnd, setEnd] = useState(false)

    const handleSlideChange = (swiper) => {
        setBeginning(swiper.isBeginning)
        setEnd(swiper.isEnd)
    }
    return (
        <>
            <div
                className='relative mb-20'>
                <div className='text-[42px] font-medium mb-4 ml-4 lg:ml-0'>
                    <AnimatedText text={'Landscape Products'} />
                </div>
                <Swiper
                    slidesPerView={4}
                    centeredSlides={false}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.navigation.prevEl = prevRef.current,
                            swiper.navigation.nextEl = nextRef.current
                    }}
                    onSlideChange={handleSlideChange}
                    modules={[Pagination, Navigation]}
                    className="mySwiper px-0 mx-0"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        620: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}
                >
                    <>
                        {
                            data?.map(blog => {
                                return <SwiperSlide
                                    key={blog.id} className='w-full mx-3 rounded-md   p-4 bg-[#F2F4F6]'>
                                    <Card
                                        _d={blog._d}
                                        title={blog.title}
                                        image={blog.blogBanner}
                                        category={blog.category}
                                    />
                                </SwiperSlide>
                            })
                        }
                    </>
                </Swiper>
                {/* Custom Buttons */}
                <div className="absolute z-10 top-1/2 left-1 transform -translate-y-1/2">
                    <SliderPrev
                        isBeginning={isBeginning}
                        prevRef={prevRef} />
                </div>
                <div className="absolute z-10 top-1/2  right-1 transform -translate-y-1/2">
                    <SliderNext
                        nextRef={nextRef}
                        isEnd={isEnd} />
                </div>
            </div>
        </>
    );
}
