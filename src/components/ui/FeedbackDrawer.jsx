import Drawer from '@mui/material/Drawer';
import ToolTip from './ToolTip';
import { IoClose } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import {
    Box,
    Stack,
    Checkbox,
    Button,
    Typography,
} from "@mui/material";
import { useContext, useState } from 'react';
import { TranslateContextData } from '../../context/TranslateContext';


export default function FeedbackSidebar() {
    const { openSlider, setOpenSlider } = useContext(TranslateContextData)
    const [feedback, setFeedback] = useState("");
    const [emailUpdates, setEmailUpdates] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback:", feedback);
        console.log("Email Updates:", emailUpdates);
    };

    const DrawerList = (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
            className="max-w-[420px]"
            role="presentation"
        >
            <Stack
                direction="row"
                className='flex justify-between items-center shadow-lg px-4 pt-2 pb-3'
            >
                <Typography variant="h6" component="h1" color='black'>
                    Send feedback to Google
                </Typography>

                <ToolTip TitleToolTip="Close" onClick={() => setOpenSlider(false)} >
                    <IoClose />
                </ToolTip>
            </Stack>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 3
                }}
            >
                <Stack direction="column" gap="5px">
                    <Typography variant="subtitle2" component="h1" color='black'>
                        Describe your feedback
                    </Typography>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className='border-2 border-black focus:outline-none focus:border-blue-500 rounded-md p-3 placeholder:text-gray-800 h-[150px]'
                        placeholder='Tell us what prompted this feedback...'
                    />

                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                        Please don’t include any sensitive information
                    </Typography>
                </Stack>

                <Stack direction="column" gap="10px" marginTop="20px">
                    <Typography variant="body2">
                        A screenshot will help us better understand your feedback. (optional)
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: "none", gap: "8px" }}
                    >
                        <RiComputerLine size={16} />
                        Capture screenshot
                    </Button>
                    <Stack marginTop="25px">
                        <Stack direction="row" alignItems="center">
                            <Checkbox
                                checked={emailUpdates}
                                onChange={(e) => setEmailUpdates(e.target.checked)}
                            />
                            <Typography variant='body2'>
                                We may email you for more information or updates
                            </Typography>
                        </Stack>
                        <Typography variant='caption'>
                            Some account and system information may be sent to Google. We will use it to fix problems and improve our services, subject to our Privacy Policy and Terms of Service. We may email you for more information or updates. Go to Legal Help to ask for content changes for legal reasons
                        </Typography>
                    </Stack>
                </Stack>

                <Stack>
                    <Button
                        disabled={feedback.length === 0}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Send
                    </Button>
                </Stack>
            </Box>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor="right"
                open={openSlider}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
