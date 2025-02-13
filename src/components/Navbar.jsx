import { Avatar, Box, Stack } from '@mui/material'
import { IoApps } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import ToolTip from './ui/ToolTip';
import { useContext, useState } from 'react';
import SidebarDrawer from './ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from './Authentication/auth';
import { TranslateContextData } from '../context/TranslateContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { setUser, user } = useContext(TranslateContextData);
  const Navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    Navigate("/")
  };

  return (
    <Stack direction="row" className='flex justify-between items-center w-full bg-white border-b h-16 px-6 fixed top-0 z-50'>

      <Stack direction="row" className='flex items-center gap-2'>
        {
          open ? <SidebarDrawer open={open} setOpen={setOpen} /> : ""
        }
        <ToolTip TitleToolTip="Main menu" onClick={() => setOpen(true)} >
          <IoMenuSharp />
        </ToolTip>
        <Box className="flex items-center gap-0 cursor-pointer" onClick={() => Navigate("/")}>
          <img className='h-18 w-24 hidden sm:flex' src='https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_FullColor_3x_830x27.max-600x600.format-webp.webp' />
          <span className='text-gray-800 text-xl font-normal border-b-2'>
            Translate
          </span>
        </Box>
      </Stack>

      <Stack direction="row" className='flex items-center gap-2'>
        <ToolTip TitleToolTip="Setting" onClick={() => Navigate('/setting')}>
          <IoSettingsOutline />
        </ToolTip>
        <ToolTip TitleToolTip="Google apps">
          <IoApps />
        </ToolTip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={10} className="border-none outline-none focus:outline-none rounded-full">
              <ToolTip TitleToolTip="Google Account" size="10">
                <Avatar
                  alt={user?.firstName}
                  src={user?.photo || user?.photoURL}
                  className="w-4 h-4 rounded-full"
                >
                  {!user?.photo && user?.firstName?.slice(0, 1).toUpperCase()}
                </Avatar>
              </ToolTip>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 sm:w-80 sm:mr-12 mr-4 sm:p-8 p-4 rounded-lg">
            <div className='flex gap-4'>
              <Avatar
                alt={user?.firstName}
                src={user?.photo || user?.photoURL}
              >
                {!user?.photo && user?.firstName?.slice(0, 1).toUpperCase()}
              </Avatar>

              <div className='flex flex-col mb-2'>
                <span className=''>{`${user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1)} ${user?.lastName?.charAt(0).toUpperCase() + user?.lastName?.slice(1)}`}</span>
                <span className='text-gray-600 text-sm'>{user.email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => Navigate('/profile')}>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Stack>
    </Stack>
  )
}

export default Navbar