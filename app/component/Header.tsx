import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import Login from "./Login";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user } = useLoaderData();
  return (
    <Disclosure
      as="nav"
      className="bg-[#1f2228]  w-full z-20  header"
    >
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center gap-2 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      "h-8 w-auto text-gray-300 flex gap-2 items-center"
                    }
                  >
                    <img
                      src="/favicon/favicon.png"
                      className="h-full object-contain"
                      alt="logo"
                    />
                    <h2 className="text-2xl font-bold leading- text-[#e9eaeb] sm:truncate sm:text-3xl sm:tracking-tight">
                      Pecha Tools
                    </h2>
                  </NavLink>
                </div>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.picture}
                          title={user?.email}
                          alt={user?.email}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {user.name}
                            </div>
                          )}
                        </Menu.Item>
                   
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/logout"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Login />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
