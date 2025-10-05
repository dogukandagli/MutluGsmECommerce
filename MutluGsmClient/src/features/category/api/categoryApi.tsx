import queries from "../../../shared/lib/apiClient";

const Category = {
  get: (url: string) => queries.get(`odata/Categories?${url}`),
  post: (formData: any) => queries.post("products", formData),
};
export default Category;
