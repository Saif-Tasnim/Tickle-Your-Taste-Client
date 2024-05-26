import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { DEV_INFO } from "../../../../static/dev/devInfo";
import { DevCard } from "./DevCard";

const InfoSwiper = () => {
  const midpointIndex = Math.floor(DEV_INFO.technologies.length / 2);
  const firstHalf = DEV_INFO.technologies.slice(0, midpointIndex);
  const secondHalf = DEV_INFO.technologies.slice(midpointIndex);

  return (
    <>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="bg-indigo-500">
          <div className="h-[332px] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">{DEV_INFO.name}</h1>
            <p className="text-xl py-8 italic">{DEV_INFO.bio}</p>
          </div>
        </SwiperSlide>

        {DEV_INFO.education.map((edu, index) => (
          <SwiperSlide>
            <DevCard
              key={index}
              title={edu.degree}
              subtitle={edu.institution}
              period={edu.year}
              i="0"
            />
          </SwiperSlide>
        ))}

        {DEV_INFO.experience.map((ex, index) => (
          <SwiperSlide>
            <DevCard
              key={index}
              title={ex.role}
              subtitle={ex.company}
              period={ex.period}
              description={ex.description}
              i="1"
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className="bg-indigo-500">
          <div className="h-[332px] flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold underline">Technologies</h1>
            <div className="flex gap-32 justify-center items-center py-8">
              <div>
                {firstHalf.map((tec) => (
                  <p className="text-lg pb-2">{tec}</p>
                ))}
              </div>
              <div>
                {secondHalf.map((tec) => (
                  <p className="text-lg pb-2">{tec}</p>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default InfoSwiper;
