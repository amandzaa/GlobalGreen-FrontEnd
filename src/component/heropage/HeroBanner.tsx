// components/HeroBanner.tsx
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Define the type for banner slides
export interface BannerSlide {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  buttonLink?: string;
}

interface HeroBannerProps {
  slides: BannerSlide[];
  onButtonClick?: (index: number) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ slides, onButtonClick }) => {
  return (
    <div className="relative bg-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ 
            el: '.swiper-pagination', 
            clickable: true,
            dynamicBullets: true 
          }}
          modules={[EffectCoverflow, Pagination]}
          className="swiper_container py-8"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="max-w-4xl">
              <div className="px-4 py-8 sm:py-12 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-sm">
                <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700">
                    {slide.description}
                  </p>
                  <button 
                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
                    onClick={() => onButtonClick && onButtonClick(index)}
                  >
                    {slide.buttonText}
                  </button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                    <Image 
                      src={slide.imageSrc} 
                      alt={slide.title} 
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          <div className="slider-controler mt-4">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>

      {/* Add component-specific CSS */}
      <style jsx global>{`
        .swiper_container {
          padding: 2rem 0;
          position: relative;
        }
        
        .swiper-slide {
          width: 85%;
          position: relative;
          transition: transform 0.3s;
        }
        
        .swiper-slide-active {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .swiper-slide {
            width: 92%;
          }
          
          .swiper-slide-active {
            transform: scale(1.03);
          }
        }
        
        @media (max-width: 480px) {
          .swiper-slide {
            width: 95%;
          }
          
          .swiper-slide-active {
            transform: scale(1.02);
          }
        }
        
        .slider-controler {
          position: relative;
          bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Removed arrow navigation styles */
        
        .swiper-pagination {
          position: relative;
          width: 100% !important;
          bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .swiper-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 4px;
          background: #cccccc;
          opacity: 0.6;
          filter: drop-shadow(0px 4px 8px rgba(18, 28, 53, 0.05));
          transition: all 0.3s ease;
        }
        
        .swiper-pagination .swiper-pagination-bullet-active {
          width: 10px;
          height: 10px;
          background: #42b549;
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .swiper-slide {
            width: 95%;
          }
          
          .swiper_container {
            padding: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;