export interface Product {
  id: string;
  name: string;
  quantity: number;
  originalPrice: number | null;
  condition: number;
  categoryId: string;
  categoryName: string;
  brandId: string | null;
  brandName: string | null;
  description: string | null;
  featured: boolean;
  createdDate: string;
  updatedDate: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  isActive: boolean;
}
