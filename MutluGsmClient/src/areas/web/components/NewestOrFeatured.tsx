import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchOdataProducts } from "../../../features/products/store/productSlice";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import type { IProduct } from "../../../features/products/types/IProduct";
import HomeProductCard from "./HomeProductCard";
import ProductSearchCard from "../../../features/products/components/ProductSearchCard";
type props = {
  query: string;
  bool?: boolean;
};

export default function NewestOrFeatured({ query, bool = true }: props) {
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
            {bool ? (
              <HomeProductCard product={p} />
            ) : (
              <ProductSearchCard product={p} />
            )}
          </SwiperSlide>
        ))
      ) : (
        <Box>One cikan urun yok</Box>
      )}
    </Swiper>
  );
}
