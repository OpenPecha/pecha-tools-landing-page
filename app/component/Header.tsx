import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
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
      className="bg-[#1f2228] border-b border-gray-700 w-full z-20 shadow-md header"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center gap-2 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      "h-10 w-auto text-gray-300 flex gap-3 items-center transition-all duration-200 hover:text-white"
                    }
                  >
                    <img
                      src="/favicon/favicon.png"
                      className="h-full object-contain"
                      alt="logo"
                    />
                    <h2 className="text-xl font-bold text-[#e9eaeb] sm:truncate sm:text-2xl sm:tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Pecha Tools
                    </h2>
                  </NavLink>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 border-2 border-gray-700 hover:border-blue-400 transition-all duration-200">
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-700 border border-gray-700 focus:outline-none">
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
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
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
