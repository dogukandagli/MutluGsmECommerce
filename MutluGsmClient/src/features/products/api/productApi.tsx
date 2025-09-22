import queries from "../../../shared/lib/apiClient";

const Product = {
  getProducts: (url: string) => queries.get(`odata/Products/${url}`),
  post: (formData: any) => queries.post("products", formData),
  deleteProduct: (id: string) => queries.post(`products/${id}`, {}),
};
export default Product;
