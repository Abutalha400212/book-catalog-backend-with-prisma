export type IGenereicResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
  };
  data: T;
};

export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
