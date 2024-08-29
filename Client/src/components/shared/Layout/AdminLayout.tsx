import Layout from "./Layout";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

interface AdminProps {
  children: JSX.Element | JSX.Element[];
}

const AdminLayout = ({ children }: AdminProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full  max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5 space-x-4">
                      <button
                        type="button"
                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                        Admin Dashboard
                      </h2>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flex items-center space-x-1">
                        <Squares2X2Icon
                          className="h-4 w-4 "
                          aria-hidden="true"
                        />
                        <NavLink
                          to="/admin/dashboard"
                          className={({ isActive }) =>
                            isActive
                              ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                              : "-m-2 block p-2 font-medium text-sm text-gray-900"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ShoppingBagIcon
                          className="h-4 w-4 text-gray-900"
                          aria-hidden="true"
                        />
                        <NavLink
                          to="/admin/product"
                          className={({ isActive }) =>
                            isActive
                              ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                              : "-m-2 block p-2 font-medium text-sm text-gray-900"
                          }
                        >
                          Product
                        </NavLink>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon
                          className="h-4 w-4 text-gray-900"
                          aria-hidden="true"
                        />
                        <NavLink
                           to="/admin/customer"
                          className={({ isActive }) =>
                            isActive
                              ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                              : "-m-2 block p-2 font-medium text-sm text-gray-900"
                          }
                        >
                          Customer
                        </NavLink>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BanknotesIcon
                          className="h-4 w-4 text-gray-900"
                          aria-hidden="true"
                        />
                        <NavLink
                         to="/admin/transaction"
                          className={({ isActive }) =>
                            isActive
                              ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                              : "-m-2 block p-2 font-medium text-sm text-gray-900"
                          }
                        >
                          Transaction
                        </NavLink>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className=" max-w-7xl px-1 sm:px-2 lg:px-2">
            <div className="flex items-baseline justify-between  border-gray-200 pb-6 ">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  ></Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-1 mt-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="p-2 ">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                

                <div className="space-y-6  px-4 py-1 hidden lg:block">
                  <h2 className=" text-xl font-bold leading-9 tracking-tight text-gray-900">
                    Admin Dashboard
                  </h2>
                  <div className="flex items-center space-x-1">
                    <Squares2X2Icon className="h-4 w-4 " aria-hidden="true" />
                    <NavLink
                      to="/admin/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                          : "-m-2 block p-2 font-medium text-sm text-gray-900"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShoppingBagIcon
                      className="h-4 w-4 text-gray-900"
                      aria-hidden="true"
                    />
                    <NavLink
                      to="/admin/product"
                      className={({ isActive }) =>
                        isActive
                          ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                          : "-m-2 block p-2 font-medium text-sm text-gray-900"
                      }
                    >
                      Product
                    </NavLink>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserGroupIcon
                      className="h-4 w-4 text-gray-900"
                      aria-hidden="true"
                    />
                    <NavLink
                      to="/admin/customer"
                      className={({ isActive }) =>
                        isActive
                          ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                          : "-m-2 block p-2 font-medium text-sm text-gray-900"
                      }
                    >
                      Customer
                    </NavLink>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BanknotesIcon
                      className="h-4 w-4 text-gray-900"
                      aria-hidden="true"
                    />
                    <NavLink
                      to="/admin/transaction"
                      className={({ isActive }) =>
                        isActive
                          ? "-m-2 block p-2 font-medium text-sm text-blue-600 "
                          : "-m-2 block p-2 font-medium text-sm text-gray-900"
                      }
                    >
                      Transaction
                    </NavLink>
                  </div>
                </div>

               
                <div className="lg:col-span-3">
                  {
                    
                    children
                  
                  }
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
