import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import img1 from "../../../../assets/banner/banner-1.jpeg";
import img2 from "../../../../assets/banner/banner-2.jpeg";
import img4 from "../../../../assets/banner/banner-4.jpeg";
import img5 from "../../../../assets/banner/banner-5.jpeg";
import img7 from "../../../../assets/banner/banner-7.jpeg";
import img8 from "../../../../assets/banner/banner-8.jpeg";
import img9 from "../../../../assets/banner/banner-1.jpg";

import SingleBanner from "./SingleBanner";

const Banner = () => {
  const BANNER = [
    {
      img: img9,
      slogan: "Cook with love, savor the flavor.",
    },
    {
      img: img2,
      slogan: "Master the recipe, master the meal.",
    },
    {
      img: img9,
      slogan: "Know the recipe, unleash your inner chef.",
    },
    {
      img: img4,
      slogan: "Every recipe tells a story.",
    },
    {
      img: img5,
      slogan: "A good recipe is a journey to great food.",
    },
    {
      img: img9,
      slogan: "Cooking is a language of the heart.",
    },
    {
      img: img7,
      slogan: "A good recipe is a journey to great food.",
    },
    {
      img: img8,
      slogan: "Know the recipe, unleash your inner chef.",
    },
    {
      img: img1,
      slogan: "Cooking is a language of the heart.",
    },
  ];
  return (
    <div className="py-2">
      <Swiper
        effect={"fade"}
        loop
        pagination={{
          dynamicBullets: true,
        }}
        autoplay
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
      >
        {BANNER.map((ban,i) => (
          <SwiperSlide key={i}>
            <SingleBanner ban={ban} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
