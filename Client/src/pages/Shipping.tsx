import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import InputType from "../components/shared/InputType";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const address = {
    city: shippingInfo.city,
    country: shippingInfo.country,
    line1: "default",
    line2: "default",
    postal_code: shippingInfo.pinCode,
    state: shippingInfo.state,
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
          name: user?.name,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <Layout>
      <button
        className="bg-red-600 hover:bg-red-500 p-2 rounded-full ml-3 mt-3 cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <ArrowLeftIcon
          className="h-4 w-4 text-white transition-all hover:-translate-x-1"
          aria-hidden="true"
        />
      </button>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Shipping Address
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <InputType
              id="address"
              name="address"
              placeholder="address"
              type="text"
              value={shippingInfo.address}
              required
              autoComplete="autocomplete"
              label="Address"
              labelFor="address"
              onChange={changeHandler}
            />
            <InputType
              id="city"
              name="city"
              placeholder="city"
              type="text"
              value={shippingInfo.city}
              required
              autoComplete="autocomplete"
              label="city"
              labelFor="city"
              onChange={changeHandler}
            />
            <InputType
              id="state"
              name="state"
              placeholder="state"
              type="text"
              value={shippingInfo.state}
              required
              autoComplete="autocomplete"
              label="state"
              labelFor="state"
              onChange={changeHandler}
            />
            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="country"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                required
                value={shippingInfo.country}
                onChange={changeHandler}
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Choose Country</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="AT">Austria</option>
                <option value="BR">Brazil</option>
              </select>
            </div>
            <InputType
              id="pinCode"
              name="pinCode"
              placeholder="pincode"
              type="number"
              value={shippingInfo.pinCode}
              required
              autoComplete="autocomplete"
              label="pincode"
              labelFor="pinCode"
              onChange={changeHandler}
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
