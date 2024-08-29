import Layout from "../components/shared/Layout/Layout";

import { useEffect, useState } from "react";

import CartItemCard from "../components/shared/CartItem";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { CartItemType } from "../types/types";
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import { RootState, server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const incrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?code=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApply(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApply(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <Layout>
      <div className="lg:flex h-full overflow-y-scroll bg-white ">
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <CartItemCard
                      key={product.productId}
                      cartItem={product}
                      incrementHandler={incrementHandler}
                      decrementHandler={decrementHandler}
                      removeHandler={removeHandler}
                    />
                  ))
                ) : (
                  <div className="flex justify-between text-3xl font-medium text-gray-800 mb-4">
                    <p>No Item Found</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </main>

        <aside className=" px-4 py-2 sm:px-6 space-y-3 lg:mt-10">
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
            <p className="text-red-600">- ₹{discount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
          <div className="flex flex-col">
            <input
              className="rounded-xl border border-gray-400"
              type="text"
              value={couponCode}
              placeholder="Coupon Code"
              id="coupon"
              onChange={(e) => setCouponCode(e.target.value)}
            />
            {couponCode &&
              (isValidCouponCode ? (
                <span className="text-sm font-normal text-green-500 mt-1">
                  ₹{discount} off using the <code>{couponCode}</code>
                </span>
              ) : (
                <span className="text-sm font-normal text-red-500 flex space-x-1 mt-1">
                  Invalid Coupon
                  <XCircleIcon className="h-6 w-6 " aria-hidden="true" />
                </span>
              ))}
          </div>

          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes are calculated here...
          </p>

          {cartItems.length > 0 && (
            <div className="mt-6">
              <Link
                to="/shipping"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
          )}

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link
              to="/products"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Shop Now
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Cart;
