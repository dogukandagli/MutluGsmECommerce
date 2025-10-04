import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchOdataSliders } from "../../../features/slider/store/sliderSlice";
import { apiUrl } from "../../../shared/lib/apiClient";
import { CircularProgress } from "@mui/material";

export default function Slider() {
  const dispatch = useAppDispatch();

  const { sliders, status } = useAppSelector((state) => state.slider);

  useEffect(() => {
    dispatch(fetchOdataSliders(""));
  }, [dispatch]);

  const images = sliders?.map((s) => s.imageUrl) ?? [];

  if (status === "pendingFetchSliders") return <CircularProgress />;

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
              src={`${apiUrl}images/${src}`}
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
