import { NavLink, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import { useEffect, useMemo, useState } from "react";
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
  Grid,
} from "@mui/material";
import { fetchOdataProducts } from "../../../features/products/store/productSlice";
import ProductHero from "../../../features/products/components/ProductHero";
import type { IProduct } from "../../../features/products/types/IProduct";
import EmptyProduct from "../components/EmptyProduct";
import ProductSearchCard from "../../../features/products/components/ProductSearchCard";

export default function CategoryProductsPage() {
  const { type, value } = useParams();

  const { products, valueCount, status } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const pageSize = type !== "search" ? 5 : 9;
  const [sort, setSort] = useState<string>("createdDate desc");

  const sortOptions = [
    { label: "Fiyat: Düşükten Yükseğe", value: "price asc" },
    { label: "Fiyat: Yüksekten Düşüğe", value: "price desc" },
    { label: "En Yeni", value: "createdDate desc" },
    { label: "En Eski", value: "createdDate asc" },
  ];
  console.log(type, value);
  const skip = (page - 1) * pageSize;

  const query = useMemo(() => {
    let filter = "";

    if (type === "category") {
      filter =
        value !== "2.El Ürünler"
          ? `&$filter=categoryName eq '${value}'`
          : `&$filter=condition eq 1`;
    } else {
      filter = `&$filter=contains(name,'${value}')`;
    }
    return `?count=true&$top=${pageSize}&$skip=${skip}${filter}&$orderby=${sort}`;
  }, [type, value, pageSize, skip, sort]);

  useEffect(() => {
    dispatch(fetchOdataProducts(query));
  }, [query, dispatch]);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 4,
          }}
        >
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
                {value}
              </Link>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 50 } }}>
              {value}
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
      {type == "search" ? (
        <Container>
          <Grid container spacing={10}>
            {products &&
              products.map((p: IProduct) => (
                <Grid size={{ xs: 12, md: 4 }}>
                  <ProductSearchCard product={p} />
                </Grid>
              ))}
          </Grid>
        </Container>
      ) : (
        products &&
        products.map((p: IProduct) => <ProductHero key={p.id} product={p} />)
      )}

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
