import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import GlobalApi from '@/app/globalApi/GlobalApi';
import SliderPrev from '@/components/shared/sliderButton/SliderPrev';
import SliderNext from '@/components/shared/sliderButton/SliderNext';
import AnimatedText from '@/components/shared/animateText/AnimateText';
import Link from 'next/link';
import Image from 'next/image';


export default function Banner() {
    const [allData] = GlobalApi()
    console.log(allData);
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const [isBeginning, setBeginning] = useState(true)
    const [isEnd, setEnd] = useState(false)

    const handleSlideChange = (swiper) => {
        setBeginning(swiper.isBeginning)
        setEnd(swiper.isEnd)
    }
    const data = []
    return (
        <>
            <div className="relative">
                <Swiper
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
                    className="mySwiper"

                >
                    <>
                        {
                            allData?.map(blog => {
                                return <SwiperSlide key={blog?._id} className=''>
                                    <div className="lg:h-screen w-full relative">
                                        <Image
                                            className="w-full h-full rounded-md object-cover"
                                            src={blog.blogBanner}
                                            alt={blog.title}
                                            width={500}
                                            height={600}
                                            unoptimized
                                        />
                                        <div className='absolute top-0 left-0 my-2 z-50
                                         text-white h-full w-full flex flex-col items-center justify-center'>
                                            <p className='text-white mb-2 font-medium text-lg uppercase'>{blog.category}</p>
                                            <div className='text-4xl font-medium'>
                                                <AnimatedText text={blog.title} />
                                            </div>
                                            <Link href={`/pages/blogDetailsPage/${blog._id}`}>
                                                <button className='border py-2 px-6 mt-6 cursor-pointer'>
                                                    Continue Reading
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="absolute top-0 left-0 w-full h-full rounded-md bg-gradient-to-b from-black/10 via-black/40 to-black/70 z-30"></div>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </>
                </Swiper>
                {/* Custom Buttons */}
                <div className="absolute z-10 top-1/2 left-12 transform -translate-y-1/2">
                    <SliderPrev
                        isBeginning={isBeginning}
                        prevRef={prevRef} />
                </div>
                <div className="absolute z-10 top-1/2  right-12 transform -translate-y-1/2">
                    <SliderNext
                        nextRef={nextRef}
                        isEnd={isEnd} />
                </div>
            </div>
        </>
    );
}