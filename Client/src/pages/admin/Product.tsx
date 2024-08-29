import { Link } from "react-router-dom";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/Loader";

const Product = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);
  const [page, setPage] = useState(1);
  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className=" w-full  space-y-3 overflow-x-scroll scrollbar-hide">
          <h1 className=" p-3 w-full overflow-hidden rounded-md text-gray-700 text-2xl lg:aspect-none group-hover:opacity-75 flex justify-center ">
            Products
          </h1>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Photo
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Price
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Stock
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((record) => (
                <tr key={record._id}>
                  <td className="px-4 py-1">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ">
                      <img
                        src={`${server}/${record.photo}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-1">{record.name}</td>
                  <td className="px-4 py-1">₹{record.price}</td>
                  <td className="px-4 py-1">{record.stock}</td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/product/${record._id}`}
                      className="bg-indigo-400 text-white p-1 rounded-lg text-sm"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.data.length! > 6 && (
            <div>
              <article className="flex justify-center space-x-3 items-center">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={!isPrevPage}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700 font-sans ">
                  {page} of {4}
                </span>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!isNextPage}
                >
                  Next
                </button>
              </article>
            </div>
          )}

          <Link className="cursor-pointer" to="/admin/product/new">
            <PlusIcon
              className="h-6 w-6 absolute right-[10%] top-[17%] text-white  bg-red-600 hover:rotate-12 transition-all rounded-full"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </AdminLayout>
  );
};

export default Product;
