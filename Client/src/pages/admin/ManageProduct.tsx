import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import InputType from "../../components/shared/InputType";

import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productAPI";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState, server } from "../../redux/store";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";

const ManageProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: productDetailsResponse,
    isLoading,
    isError,
  } = useProductDetailsQuery(params.id!);

  const { price, photo, name, stock, category } =
    productDetailsResponse?.data || {
      photo: "",
      category: "",
      name: "",
      stock: 0,
      price: 0,
    };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      userId: user?._id!,
      formData,
      productId: productDetailsResponse?.data._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: productDetailsResponse?.data._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (productDetailsResponse) {
      setNameUpdate(productDetailsResponse.data.name);
      setPriceUpdate(productDetailsResponse.data.price);
      setStockUpdate(productDetailsResponse.data.stock);
      setCategoryUpdate(productDetailsResponse.data.category);
    }
  }, [productDetailsResponse]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <button className="cursor-pointer" onClick={deleteHandler}>
            <ArchiveBoxIcon
              className="h-6 w-6 absolute right-[10%] top-[17%] text-red-600  hover:rotate-12 transition-all rounded-full"
              aria-hidden="true"
            />
          </button>
          <div className="flex flex-col items-center lg:absolute lg:top-[29%]">
            <div className="relative space-y-6 mb-6">
              {stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  {stock} Available
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Not Available
                </span>
              )}
              <div>
                <span className="absolute -left-[150%] text-sm font-mono">
                  ID -
                </span>
                <span className="absolute -left-[100%] text-sm font-mono">
                  {productDetailsResponse?.data._id}
                </span>
              </div>
            </div>

            <img
              src={`${server}/${photo}`}
              className="object-cover object-center h-72 w-72"
            />
            <p className="text-sm text-gray-700">{name}</p>
            <h2 className="text-xl font-bold text-gray-800">₹{price}</h2>
          </div>
          <div className="mt-5 min-h-full flex-1 flex-col justify-center px-6  lg:px-8 lg:absolute lg:top-16 lg:right-[20%]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Manage
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={submitHandler}>
                <InputType
                  id="name"
                  name="name"
                  placeholder="name"
                  type="text"
                  value={nameUpdate}
                  autoComplete="autocomplete"
                  label="name"
                  labelFor="name"
                  onChange={(e) => setNameUpdate(e.target.value)}
                />
                <InputType
                  id="price"
                  name="price"
                  placeholder="price"
                  type="number"
                  value={priceUpdate}
                  autoComplete="autocomplete"
                  label="price"
                  labelFor="price"
                  onChange={(e) => setPriceUpdate(Number(e.target.value))}
                />
                <InputType
                  id="stock"
                  name="stock"
                  placeholder="stock"
                  type="number"
                  value={stockUpdate}
                  autoComplete="autocomplete"
                  label="stock"
                  labelFor="stock"
                  onChange={(e) => setStockUpdate(Number(e.target.value))}
                />

                <InputType
                  id="catagory"
                  name="catagory"
                  placeholder="catagory"
                  type="text"
                  value={categoryUpdate}
                  autoComplete="autocomplete"
                  label="catagory"
                  labelFor="catagory"
                  onChange={(e) => setCategoryUpdate(e.target.value)}
                />
                <div className="col-span-full ">
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                          <input
                            id="file"
                            type="file"
                            onChange={changeImgHandler}
                            className="bg-gray-100 "
                          />
                        </div>
                      </div>
                      <p className="text-xs leading-5 text-gray-600 p-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                {photoUpdate && (
                  <div className="flex items-center justify-center">
                    <img
                      src={photoUpdate}
                      alt="New Image"
                      className=" h-40 w-40"
                    />
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default ManageProduct;
