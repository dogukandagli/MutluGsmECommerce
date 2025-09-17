import queries from "../../../shared/lib/apiClient";

const Product = {
  get: () => queries.get("odata/products"),
  post: (formData: any) => queries.post("products", formData),
};
export default Product;
