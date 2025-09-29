import { useParams, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { fetchOdataProducts } from "../../../features/products/store/productSlice";
import ProductHero from "../../../features/products/components/ProductHero";
import type { IProduct } from "../../../features/products/types/IProduct";
import EmptyProduct from "../components/emptyProduct";

export default function CategoryProductsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products, valueCount, status } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sort, setSort] = useState<string>("createdDate asc");

  const sortOptions = [
    { label: "Fiyat: Düşükten Yükseğe", value: "price asc" },
    { label: "Fiyat: Yüksekten Düşüğe", value: "price desc" },
    { label: "En Yeni", value: "createdDate asc" },
    { label: "En Eski", value: "createdDate desc" },
  ];

  useEffect(() => {
    if (categoryName) {
      const skip = (page - 1) * pageSize;
      const query =
        `$top=${pageSize}&$skip=${skip}` +
        `&$filter=categoryName eq '${categoryName}'` +
        `&$orderby=${sort}`;
      dispatch(fetchOdataProducts(query));
    }
  }, [categoryName, page, sort]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setPage(1);
  };

  const pageCount = Math.ceil(valueCount / pageSize);

  if (status === "pendingFetchProducts") return <CircularProgress />;

  if (valueCount == 0) return <EmptyProduct />;

  return (
    <>
      <Container maxWidth="lg">
        {/* Breadcrumb + Category Name + Sort */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 4,
          }}
        >
          {/* Sol taraf: Breadcrumb + kategori adı */}
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                component={NavLink}
                to="/"
              >
                Anasayfa
              </Link>
              <Link underline="hover" color="text.primary">
                {categoryName}
              </Link>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 50 } }}>
              {categoryName}
            </Typography>
          </Box>

          <FormControl sx={{ minWidth: { md: 200 } }}>
            <InputLabel>Sırala</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sırala">
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
      {products &&
        products.map((p: IProduct) => <ProductHero key={p.id} product={p} />)}
      <Stack spacing={2} alignItems={"center"} sx={{ my: 5 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          variant="outlined"
        />
      </Stack>
    </>
  );
}
