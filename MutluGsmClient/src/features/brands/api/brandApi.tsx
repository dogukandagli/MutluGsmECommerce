import queries from "../../../shared/lib/apiClient";

const Brand = {
  get: (select: string) => queries.get(`odata/Brands?$select=${select}`),
  post: (formData: any) => queries.post("products", formData),
};
export default Brand;
