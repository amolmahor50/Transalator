import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TranslateContextData } from '../../context/TranslateContext';

export const GoogleTranslateLogo = () => {
    return (
        <Box className="flex items-center gap-0 cursor-pointer">
            <img className='h-18 w-24' src='https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_FullColor_3x_830x27.max-600x600.format-webp.webp' />
            <span className='text-gray-800 text-xl font-normal border-b-2'>
                Translate
            </span>
        </Box>
    )
}

export default function SidebarDrawer({ open, setOpen }) {
    const { setOpenSlider } = useContext(TranslateContextData)
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box
            sx={{ width: 300, display: "flex", justifyContent: "center", padding: "20px", flexDirection: "column" }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <GoogleTranslateLogo />
            <Stack direction="column" className='flex gap-4 pl-4'>
                <Typography
                    variant='body2'
                    className='border-b-2 pb-1 w-fit cursor-pointer'
                    onClick={() => navigate("/about")}>
                    About Google Translate
                </Typography>
                <Stack direction="column" gap={4} marginTop={3}>
                    <Typography variant='body2' className='cursor-pointer'>
                        Privacy and Terms
                    </Typography>
                    <Typography variant='body2' className='cursor-pointer'>
                        Help
                    </Typography>
                    <Typography variant='body2' className='cursor-pointer' onClick={() => setOpenSlider(true)}>
                        Send feedback
                    </Typography>
                    <Typography variant='body2' className='cursor-pointer'>
                        About Google
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
