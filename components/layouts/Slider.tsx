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

const Slider = () => {
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

    return (
        <>
            <div className="navigation-wrapper mt-10">
                <div ref={sliderRef} className="keen-slider">
                    <div className="keen-slider__slide number-slide1">
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero6}
                        />
                    </div>
                    <div className="keen-slider__slide number-slide2">
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero2}
                        />
                    </div>
                    <div className="keen-slider__slide number-slide3">
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero3}
                        />
                    </div>
                    <div className="keen-slider__slide number-slide4">
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero4}
                        />
                    </div>
                    <div className="keen-slider__slide number-slide5">
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero5}
                        />
                    </div>
                    <div className="keen-slider__slide number-slide6">
                        {' '}
                        <Image
                            alt="hero"
                            fill={true}
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                width: '100%',
                            }}
                            src={hero}
                        />
                    </div>
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
                                instanceRef.current.track.details.slides
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
                            instanceRef.current.track.details.slides.length
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
