import Balmoral from "./SliderCards/Balmoral";
import GetInvolved from "./SliderCards/GetInvolved";
import Voyager from "./SliderCards/Voyager";
import XclusiveCard from "./SliderCards/XclusiveCard";
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

    const Carousel = () => {
      const sliderRef = useRef(null);
    
      useEffect(() => {
        const interval = setInterval(() => {
          if (sliderRef.current) {
            sliderRef.current.slickNext();
          }
        }, 3000); // Adjust the interval as needed
    
        return () => clearInterval(interval);
      }, []);
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    
      return (
        <div className="carousel-container mt-[10%]">
          <Slider ref={sliderRef} {...settings}>
            <div className="card"><Balmoral /></div>
            <div className="card"><GetInvolved /></div>
            <div className="card"><Voyager /></div>
            <div className="card"><XclusiveCard /> </div>
          </Slider>
        </div>
      );
    };
    
    

export default Carousel;
