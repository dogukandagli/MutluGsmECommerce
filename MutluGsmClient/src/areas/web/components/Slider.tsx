import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Box } from "@mui/system";

export default function Slider() {
  const images = [
    "https://www.gurgencler.com.tr/media/homepageslider/desktop/iphone17pro-2209.png",
    "https://www.gurgencler.com.tr/media/homepageslider/desktop/iphone-17-pro-satis-1909_1.png",
    "https://localhost:7261/images/WhatsApp Görsel 2025-09-29 saat 14.25.49_32d9dcdd.jpg",
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      loop
      allowTouchMove={true}
      style={{ maxHeight: "400px", width: "100%", aspectRatio: "16 / 9" }}
    >
      <Box>
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Box>
    </Swiper>
  );
}
