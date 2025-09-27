import queries from "../../../shared/lib/apiClient";

const Product = {
  getProducts: (url: string) => queries.get(`odata/Products?${url}`),
  createProduct: (formData: any) => queries.post("products", formData),
  deleteProduct: (id: string) => queries.delete(`products/${id}`),
  updateProduct: (formData: any) => queries.put("products", formData),
};
export default Product;
