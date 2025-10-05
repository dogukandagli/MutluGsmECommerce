export interface ICategory {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  isActive: boolean;
}
