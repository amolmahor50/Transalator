import { Avatar, Box, Stack, Typography } from '@mui/material'
import { IoApps } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import ToolTip from './ui/ToolTip';
import { useState } from 'react';
import SidebarDrawer from './ui/sidebar';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  const Navigate = useNavigate();

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
        <ToolTip TitleToolTip="Setting">
          <IoSettingsOutline />
        </ToolTip>
        <ToolTip TitleToolTip="Google apps">
          <IoApps />
        </ToolTip>
        <ToolTip TitleToolTip="Google Account">
          <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" />
        </ToolTip>
      </Stack>

    </Stack>
  )
}

export default Navbar