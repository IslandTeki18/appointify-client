import * as React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  FireIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "./Avatar";
import { NavLink } from "react-router-dom";

type NavItem = {
  name: string;
  href: string;
  current: boolean;
};

type NavbarProps = {
  navigation: NavItem[];
  logoSrc?: string;
  profileImageSrc?: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  hasAvatar?: boolean;
};

const variantClasses = {
  primary: {
    base: "bg-blue-600",
    text: "text-white",
    hover: "hover:bg-blue-700",
    active: "bg-blue-800",
  },
  secondary: {
    base: "bg-gray-800",
    text: "text-white",
    hover: "hover:bg-gray-700",
    active: "bg-gray-900",
  },
  success: {
    base: "bg-green-600",
    text: "text-white",
    hover: "hover:bg-green-700",
    active: "bg-green-800",
  },
  danger: {
    base: "bg-red-600",
    text: "text-white",
    hover: "hover:bg-red-700",
    active: "bg-red-800",
  },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar: React.FC<NavbarProps> = ({
  navigation,
  logoSrc,
  profileImageSrc,
  variant = "secondary",
  hasAvatar = false,
}) => {
  const variantStyle = variantClasses[variant];

  return (
    <Disclosure as="nav" className={`${variantStyle.base} w-full`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton
                  className={`group relative inline-flex items-center justify-center rounded-md p-2 ${variantStyle.text} ${variantStyle.hover} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {logoSrc ? (
                    <img
                      className="h-8 w-auto"
                      src={logoSrc}
                      alt="Your Company"
                    />
                  ) : (
                    <FireIcon className="h-8 w-8 text-white" />
                  )}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? variantStyle.active
                            : variantStyle.hover,
                          variantStyle.text,
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {hasAvatar && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className={`relative rounded-full p-1 ${variantStyle.text} ${variantStyle.hover} focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-${variantStyle.base}`}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton
                        className={`relative flex rounded-full ${variantStyle.base} text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-${variantStyle.base}`}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {profileImageSrc ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={profileImageSrc}
                            alt=""
                          />
                        ) : (
                          <Avatar alt="John Doe" size="sm" />
                        )}
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? variantStyle.active : variantStyle.hover,
                    variantStyle.text,
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
