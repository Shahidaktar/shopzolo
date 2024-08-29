import { CartItemType, Order, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductsResponse = {
  success: boolean;
  data: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  data: string[];
};

export type searchProductsResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};


export type ProductResponse = {
  success: boolean;
  data: Product;
};

export type StatsResponse = {
  success: boolean;
  data: Stats
};

export type AllOrdersResponse = {
  success: boolean;
  data: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  data: Order;
};

export type searchProductsRequest = {
  price: number;
  page: number;
  search: string;
  category: string;
  sort: string;
};

export type NewProductRequest = {
  id: string;
  formData:FormData
};


export type UpdateProductRequest = {
  userId:string;
  productId:string;
  formData:FormData;
};

export type DeleteProductRequest = {
  userId:string;
  productId:string;
};


export type NewOrderRequest = {
  orderItems: CartItemType[];
  subtotal:number;
  tax:number;
  shippingCharges:number;
  discount:number;
  total:number;
  shippingInfo:ShippingInfo;
  user:string;
};


export type UpdateOrderRequest = {
  userId:string;
  orderId:string;
};

export type DeleteUserRequest = {
  userId:string;
  adminUserId:string;
};
