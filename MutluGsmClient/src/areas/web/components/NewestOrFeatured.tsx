import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchOdataProducts } from "../../../features/products/store/productSlice";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import type { IProduct } from "../../../features/products/types/IProduct";
import HomeProductCard from "./HomeProductCard";
type props = {
  query: string;
};

export default function NewestOrFeatured({ query }: props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    dispatch(fetchOdataProducts(query))
      .unwrap()
      .then((res) => {
        setProducts(res.value);
      });
  }, []);

  if (status === "pendingFetchProducts") return <CircularProgress />;

  return (
    <Swiper slidesPerView="auto" spaceBetween={0} grabCursor={true}>
      {products ? (
        products.map((p) => (
          <SwiperSlide
            key={p.id}
            style={{
              width: "auto",
              height: "446px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HomeProductCard product={p} />
          </SwiperSlide>
        ))
      ) : (
        <Box>One cikan urun yok</Box>
      )}
    </Swiper>
  );
}
