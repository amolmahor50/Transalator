import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineLightMode } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import BasicTooltip from "./ui/ToolTip";
import ToolTip from "./ui/ToolTip";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const HeaderNavigationItems = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Commands", href: "/commands", current: false },
];

const ProfileMunuItems = [
  { name: "Profile", href: "/" },
  { name: "Setting", href: "/" },
  { name: "Sign Out", href: "/" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();

  // Dynamically determine which route is currently active
  const updatedHeaderNavigationItems = HeaderNavigationItems.map((item) => ({
    ...item,
    // Check if the current path matches the href of the item
    current: location.pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="border-b">

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <HiMiniBars3BottomLeft
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* header logo */}
            <div className="flex shrink-0 items-center">
              <img
                alt="Translate"
                src="../../Logo.png"
                className="h-8 w-auto mr-10"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {
                  updatedHeaderNavigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-700 hover:text-white",
                        "rounded-md px-2 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))
                }
              </div>
            </div>

          </div>

          <div className="absolute inset-y-0 right-0 flex sm:gap-2 gap-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* notification bell icon */}
            <BasicTooltip TitleToolTip={"Notification"}>
              <BsBell size={25} />
            </BasicTooltip>

            {/* Profile */}
            <Menu as="div" className="relative ml-3">

              {/* User profile avatar */}
              <ToolTip TitleToolTip={"Profile"}>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <Stack direction="row">
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      alt="Amol Mahor" src="https://st3.depositphotos.com/19428878/36451/v/450/depositphotos_364516198-stock-illustration-businessman-icon-image-male-avatar.jpg" />
                  </Stack>
                </MenuButton>
              </ToolTip>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                {
                  ProfileMunuItems.map((userProfileItem, index) => (
                    <MenuItem key={index}>
                      <Link
                        to={userProfileItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        {userProfileItem.name}
                      </Link>
                    </MenuItem>
                  ))
                }
              </MenuItems>

            </Menu>

            {/* dark light mode toggle button */}
            <ToolTip TitleToolTip={"Mode"}>
              <MdOutlineLightMode />
            </ToolTip>

          </div>
        </div>
      </div>

      {/* mobile view navugation open  */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {
            updatedHeaderNavigationItems.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-sm font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))
          }
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
