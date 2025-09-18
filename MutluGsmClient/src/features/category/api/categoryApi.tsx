import queries from "../../../shared/lib/apiClient";

const Category = {
  get: (select: string) => queries.get(`odata/Categories?$select=${select}`),
  post: (formData: any) => queries.post("products", formData),
};
export default Category;
