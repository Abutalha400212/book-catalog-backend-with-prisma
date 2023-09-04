import { AdminSearchableFields } from "../app/modules/admin/admin.constant";
import { IAdminFilter } from "../app/modules/admin/admin.interface";
import { CowSearchableFields } from "../app/modules/cow/cow.constant";
import { ICowFilter } from "../app/modules/cow/cow.interface";
import { UserSearchableFields } from "../app/modules/user/user.constant";
import { IUserFilter } from "../app/modules/user/user.interface";

const CowFilteringHelpers = (options: ICowFilter) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = options;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: CowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  if (minPrice || maxPrice) {
    maxPrice &&
      andConditions.push({
        price: { $lte: maxPrice },
      });
    minPrice &&
      andConditions.push({
        price: { $gte: minPrice },
      });
  }
  return andConditions;
};
const UserFilteringHelpers = (options: IUserFilter) => {
  const { searchTerm, ...filtersData } = options;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: UserSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  return andConditions;
};
const AdminFilteringHelpers = (options: IAdminFilter) => {
  const { searchTerm, ...filtersData } = options;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: AdminSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  return andConditions;
};

export const FilteringHelper = {
  CowFilteringHelpers,
  UserFilteringHelpers,
  AdminFilteringHelpers,
};
