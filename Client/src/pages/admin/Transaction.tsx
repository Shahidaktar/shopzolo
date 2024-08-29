import { Link } from "react-router-dom";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { useSelector } from "react-redux";
import { CustomError } from "../../types/api-types";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { RootState } from "../../redux/store";

const Transaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const {
    data: orderResponse,
    isLoading,
    isError,
    error,
  } = useAllOrdersQuery(user?._id!);

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
            Orders
          </h1>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  User
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Discount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Quantity
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orderResponse?.data.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-1">{order.user.name}</td>
                  <td className="px-4 py-1">{order.total}</td>
                  <td className="px-4 py-1">{order.discount}</td>
                  <td className="px-4 py-1">{order.orderItems.length}</td>
                  <td className="px-4 py-1">
                    <span
                      className={
                        order.status === "Processing"
                          ? "text-red-600"
                          : order.status === "Shipped"
                          ? "text-green-600"
                          : "text-violet-700"
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/transaction/${order._id}`}
                      className="bg-indigo-400 text-white p-1 rounded-lg text-sm"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Transaction;
