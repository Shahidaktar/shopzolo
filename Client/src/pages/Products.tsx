import Layout from "../components/shared/Layout/Layout";

import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import ProductCard from "../components/shared/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItemType } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";


const Products = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: searchData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <Layout>
      <div className="bg-white">
        <div>
       
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                   
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      <div className="space-y-6">
                        <div className="flex flex-col items-start space-y-2 px-3">
                          <span className="font-medium text-gray-900">
                            Sort
                          </span>
                          <select
                            id="sort"
                            name="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">None</option>
                            <option value="asc">Price (Low to High)</option>
                            <option value="dsc">Price (High to Low)</option>
                          </select>
                        </div>
                        <div className="flex flex-col items-start space-y-2 px-3">
                          <span className="font-medium text-gray-900">
                            price {maxPrice || ""}
                          </span>
                          <input
                            type="range"
                            className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
                            id="price"
                            value={maxPrice}
                            min={100}
                            max={100000}
                            onChange={(e) =>
                              setMaxPrice(Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="flex flex-col items-start space-y-2 px-3">
                          <span className="font-medium text-gray-900">
                            Catagory
                          </span>
                          <select
                            id="catagory"
                            name="catagory"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">ALL</option>
                            {!loadingCategories &&
                              categoriesResponse?.data.map((i) => (
                                <option key={i} value={i}>
                                  {i.toUpperCase()}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  ></Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-6 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
                
                <div className="hidden lg:block lg:w-72">
                  <h3 className="sr-only">Categories</h3>

                  <div className="space-y-6">
                    <div className="flex flex-col items-start space-y-2 px-3">
                      <span className="font-medium text-gray-900">Sort</span>
                      <select
                        id="sort"
                        name="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                      </select>
                    </div>
                    <div className="flex flex-col items-start space-y-2 px-3">
                      <span className="font-medium text-gray-900">
                        price {maxPrice || ""}
                      </span>
                      <input
                        type="range"
                        className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
                        id="price"
                        value={maxPrice}
                        min={100}
                        max={100000}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-2 px-3">
                      <span className="font-medium text-gray-900">
                        Catagory
                      </span>
                      <select
                        id="catagory"
                        name="catagory"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">ALL</option>
                        {!loadingCategories &&
                          categoriesResponse?.data.map((i) => (
                            <option key={i} value={i}>
                              {i.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 lg:ml-10">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none focus:ring-transparent text-sm "
                  />
                  {
                    
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                        <div className=" grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {productLoading ? (
                            <Skeleton />
                          ) : (
                            searchData?.products.map((product) => (
                              <ProductCard
                                key={product._id}
                                productId={product._id}
                                name={product.name}
                                photo={product.photo}
                                price={product.price}
                                stock={product.stock}
                                handler={addToCartHandler}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                 
                  }
                  {searchData && searchData.totalPage > 1 && (
                    <article className="flex justify-center space-x-3 items-center">
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={!isPrevPage}
                      >
                        Prev
                      </button>
                      <span className="text-sm text-gray-700 font-sans">
                        {page} of {searchData.totalPage}
                      </span>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!isNextPage}
                      >
                        Next
                      </button>
                    </article>
                  )}
                </div>

               
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
