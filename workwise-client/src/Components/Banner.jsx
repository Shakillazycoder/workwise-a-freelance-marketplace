
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import image from "../../src/assets/carousel1.jpg"
import image2 from "../../src/assets/carousel2.jpg"
import image3 from "../../src/assets/carousel3.jpg"

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

export default function Banner() {
  return (
    <div className='container px-4 mx-auto rounded-2xl'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper cursor-pointer"
      >
        <SwiperSlide><Slider image={image} text='Get Your Web DeveLopment Project Done in minutes'></Slider></SwiperSlide>
        <SwiperSlide><Slider image={image2} text='Get Your Graphic Design Project Done in minutes'></Slider></SwiperSlide>
        <SwiperSlide><Slider image={image3} text='Start Your Digital Marketing Campaigns up in Minutes'></Slider></SwiperSlide>
      </Swiper>
    </div>
  );
}
