import queries from "../../../shared/lib/apiClient";

const Product = {
  get: (url: string) => queries.get(`odata/Products/${url}`),
  post: (formData: any) => queries.post("products", formData),
};
export default Product;
