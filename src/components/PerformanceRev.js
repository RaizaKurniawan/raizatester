import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaDownload } from "react-icons/fa";

// Array of slide paths (15 slides)
const performanceSlides = Array.from({ length: 16 }, (_, index) => `/assets/performance-slides/performance-slide${index + 1}.png`);

const PerformanceRev = () => {
  return (
    <section id="performance-review" className="performance-rev-section">
      <h2 className="performance-rev-title">Performance Review 2024</h2>
      <div className="performance-rev-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Auto-slide every 5 seconds
          loop={true}
          className="performance-rev-swiper"
          lazy={true}
        >
          {performanceSlides.map((slide, index) => {
            const altText = `Performance Review Slide ${index + 1}`;
            return (
              <SwiperSlide key={index}>
                <img
                  src={slide}
                  alt={altText}
                  className="performance-rev-slide swiper-lazy"
                  loading="lazy"
                />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <a href="/assets/Raiza2024-PerformanceReviews.pdf" download className="download-link">
          Download Performance Review PDF
          <FaDownload style={{ marginLeft: "8px" }} />
        </a>
      </div>
    </section>
  );
};

export default PerformanceRev;