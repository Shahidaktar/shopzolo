import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { RootState, server } from "../../redux/store";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Order, OrderItem } from "../../types/types";
import { useSelector } from "react-redux";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderAPI";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};

const ManageTransaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();
  const {
    data: orderResponse,
    isLoading,
    isError,
  } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, country, state, pinCode },
    orderItems,
    user: { name },
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
    status,
    _id: orderId,
  } = orderResponse?.data || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const updateHandler = async () => {
    const res = await updateOrder({
      orderId,
      userId: user?._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      orderId,
      userId: user?._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

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
          <div className="lg:flex h-full overflow-y-scroll bg-white">
            <main className="flex-1 overflow-y-auto px-4 py-2 sm:px-6 scrollbar-hide">
              <div className="">
                <div className="flow-root">
                  <ul role="list">
                    {orderItems.map((product) => (
                      <CartItemCard
                        key={product._id}
                        name={product.name}
                        photo={product.photo}
                        quantity={product.quantity}
                        price={product.price}
                        productId={product.productId}
                        _id={product._id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </main>

            <aside className=" px-4 py-2 sm:px-6 space-y-3 lg:mt-10">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>User Info</p>
              </div>
              <p className="flex justify-between  text-sm font-normal text-gray-500">
                Name: {name}
              </p>
              <p className="flex justify-between  text-sm font-normal text-gray-500">
                Address:{" "}
                {`${address}, ${city}, ${state}, ${
                  country === "IN" ? "india" : ""
                }, ${pinCode}`}
              </p>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Amount Info</p>
              </div>
              <div className="flex justify-between  text-sm font-normal text-gray-500">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <div className="flex justify-between  text-sm font-normal text-gray-500">
                <p>Shipping Charge</p>
                <p>₹{shippingCharges}</p>
              </div>
              <div className="flex justify-between  text-sm font-normal text-gray-500">
                <p>Tax</p>
                <p>₹{tax}</p>
              </div>
              <div className="flex justify-between  text-sm font-normal text-gray-500">
                <p>Discount</p>
                <p>- ₹{discount}</p>
              </div>
              <div className="flex justify-between  text-sm font-normal text-gray-500">
                <p>Total</p>
                <p>₹{total}</p>
              </div>

              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Status Info</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Status :{" "}
                <span
                  className={
                    status === "Processing"
                      ? "text-red-600"
                      : status === "Shipped"
                      ? "text-green-600"
                      : "text-violet-700"
                  }
                >
                  {status}
                </span>
              </p>

              <div className="mt-6 flex justify-center  text-center text-base rounded-lg p-2 bg-red-600 hover:bg-red-500">
                <button
                  className="font-semibold text-white "
                  onClick={updateHandler}
                >
                  Process Status
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default ManageTransaction;

const CartItemCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => {
  return (
    <li className="py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={`${server}/${photo}`}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4">
          <Link
            to={`/admin/product/${productId}`}
            className="text-base font-medium text-gray-900"
          >
            {name}
          </Link>
        </div>
      </div>

      <div className="flex space-x-5">
        <div className="flex items-start  space-x-3">
          <span className="text-gray-500">
            ₹{price} X {quantity} = ₹{price * quantity}
          </span>
        </div>
      </div>
    </li>
  );
};
