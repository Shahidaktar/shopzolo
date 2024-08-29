import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout/Layout";
import ProductCard from "../components/shared/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItemType } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch=useDispatch()

  const addToCartHandler = (cartItem:CartItemType) => {
    if(cartItem.stock<1) return toast.error("Out of Stock")
    dispatch(addToCart(cartItem))
    toast.success("Added to Cart")
  };
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <Layout>
      <div className=" cursor-pointer flex   gap-6 group relative  text-white  px-6 py-8 h-[250px] w-full lg:h-[500px] lg:w-full">
        <div
          className="h-full bg-cover left-1 top-1 right-1 bg-center absolute inset-0"
          style={{
            backgroundImage: `url("/laptop.jpg")`,
          }}
        />
      </div>
      <div className="flex justify-between p-3">
        <h2 className="text-xl font-medium tracking-tight text-gray-800 ">
          Latest Products
        </h2>
        <Link className="font-medium text-gray-600" to="/products">
          More
        </Link>
      </div>

      <div className="lg:col-span-3">
        {
          /* Your content */
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
              <div className=" grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  data?.data.map((i) => (
                    <ProductCard
                      key={i._id}
                      productId={i._id}
                      name={i.name}
                      photo={i.photo}
                      price={i.price}
                      stock={i.stock}
                      handler={addToCartHandler}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          /* content */
        }
      </div>
    </Layout>
  );
};

export default Home;
