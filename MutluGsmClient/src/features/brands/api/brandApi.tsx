import queries from "../../../shared/lib/apiClient";

const Brand = {
  getBrands: (url: string) => queries.get(`odata/Brands?${url}`),
  createBrand: (data: any) => queries.post("brands", data),
};
export default Brand;
