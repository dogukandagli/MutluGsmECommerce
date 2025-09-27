import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchOdataProducts,
  selectAllProducts,
} from "../../products/store/productSlice";
import { useEffect, useState } from "react";
import type { IProduct } from "../../products/types/IProduct";
import ProductHero from "../../products/components/DefaultPageLayout";
import { CircularProgress } from "@mui/material";

export default function ProductbyCategories() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      var query = `$filter=categoryName eq '${categoryName}'`;
      dispatch(fetchOdataProducts(query));
    }
    setLoading(false);
  }, [categoryName]);

  const products = useAppSelector((state) => selectAllProducts(state));
  if (loading) return <CircularProgress />;

  return (
    <>
      {products.map((p: IProduct) => (
        <ProductHero key={p.id} product={p} />
      ))}
    </>
  );
}
