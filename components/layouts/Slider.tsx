'use client';

import React, { useState } from 'react';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import 'keen-slider/keen-slider.min.css';
import './slider.css';
import hero from '@/public/images/hero-1.jpg';
import hero2 from '@/public/images/hero-2.jpeg';
import hero3 from '@/public/images/hero-3.jpg';
import hero4 from '@/public/images/hero-4.jpeg';
import hero5 from '@/public/images/hero-5.jpeg';
import hero6 from '@/public/images/hero-6.jpeg';
import { useSuspenseQuery } from '@apollo/client';
import { GET_ALL_SLIDERS } from '@/apollo/query/slider-query';
import { useRouter } from 'next/navigation';

const Slider = () => {
    const router = useRouter();
    const basePath = process.env.BASE_PATH ?? '';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });
    const { data: sliderData } = useSuspenseQuery(GET_ALL_SLIDERS, {
        variables: {
            queryString: {
                limit: null,
            },
        },
    });

    return (
        <>
            <div className="navigation-wrapper mt-10 animate__fadeInDown animate__animated z-0">
                <div ref={sliderRef} className="keen-slider">
                    {sliderData &&
                        // @ts-ignore
                        sliderData.getAllSliders.sliders.map((slider) => (
                            <div
                                key={slider._id}
                                className="keen-slider__slide number-slide1"
                            >
                                <Image
                                    alt="hero"
                                    fill={true}
                                    style={{
                                        objectFit: 'cover',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    src={slider.image}
                                />
                                <div
                                    style={{
                                        textShadow: '2px 2px 4px #000000',
                                    }}
                                    className="z-10 py-10 px-20 "
                                >
                                    {slider.title ? (
                                        <h4 className="text-3xl mb-3">
                                            {slider.title}
                                        </h4>
                                    ) : null}
                                    {slider.body ? (
                                        <p className="text-xs tracking-widest leading-5">
                                            {slider.body.substring(0, 250)}...
                                        </p>
                                    ) : null}
                                    {slider.route ? (
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `${basePath}${slider.route}`
                                                )
                                            }
                                            className="text-xs uppercase bg-primary p-4 tracking-wider rounded-sm shadow"
                                        >
                                            Go To {slider.route.split('/')[1]}
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <IoIosArrowBack
                            className="arrow arrow--left"
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <IoIosArrowForward
                            className="arrow arrow--right"
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details?.slides
                                    .length -
                                    1
                            }
                        />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[
                        //@ts-ignore
                        ...Array(
                            instanceRef.current.track.details?.slides.length
                        ).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                    'dot' +
                                    (currentSlide === idx ? ' active' : '')
                                }
                            ></button>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Slider;
