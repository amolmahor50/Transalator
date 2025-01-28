import Drawer from "@mui/material/Drawer";
import ToolTip from "./ToolTip";
import { IoClose } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import {
    Box,
    Stack,
    Checkbox,
    Button,
    Typography,
    Modal,
} from "@mui/material";
import { useContext, useState } from "react";
import html2canvas from "html2canvas";
import { TranslateContextData } from "../../context/TranslateContext";
import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { toast } from "sonner";

export default function FeedbackSidebar() {
    const { openSlider, setOpenSlider } = useContext(TranslateContextData);
    const [feedback, setFeedback] = useState("");
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [approvedScreenshot, setApprovedScreenshot] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = fetch("https://translator-a0afd-default-rtdb.firebaseio.com/feedBackData.json",
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    feedback,
                    approvedScreenshot,
                })
            }
        );

        if (resp) {
            setOpenSlider(false)
            toast("Send Feedback", {
                action: {
                    label: "Close"
                }
            })
        }

        setFeedback("")
        setEmailUpdates(false);
        setApprovedScreenshot(null)
    };

    const handleScreenshot = async () => {
        try {
            // Temporarily hide the feedback drawer
            const drawerElement = document.querySelector(".MuiDrawer-root");
            if (drawerElement) {
                drawerElement.style.display = "none";
            }

            // Capture the screenshot of the rest of the page
            const canvas = await html2canvas(document.body);
            const dataUrl = canvas.toDataURL("image/png"); // Convert to Base64 image
            setScreenshot(dataUrl); // Save the screenshot for the modal
            setModalOpen(true); // Open the modal to show the screenshot

            // Restore the feedback drawer
            if (drawerElement) {
                drawerElement.style.display = "block";
            }
        } catch (error) {
            console.error("Error capturing screenshot:", error);
        }
    };

    const handleAllow = () => {
        setApprovedScreenshot(screenshot); // Save the screenshot as approved
        setModalOpen(false); // Close the modal
    };

    const handleCancel = () => {
        setModalOpen(false); // Close the modal without approving the screenshot
    };

    const DrawerList = (
        <Box
            className="max-w-[420px]"
            role="presentation"
        >
            <Stack
                direction="row"
                width={420}
                className="flex justify-between items-center shadow-lg px-4 pt-2 pb-3 fixed top-0 h-14 z-50 bg-white"
            >
                <Typography variant="h6" component="h1" color="black">
                    Send feedback to Google
                </Typography>

                <ToolTip TitleToolTip="Close" onClick={() => setOpenSlider(false)}>
                    <IoClose />
                </ToolTip>
            </Stack>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 3,
                    marginTop: "60px"
                }}
            >
                <Stack direction="column" gap="5px">
                    <Typography variant="subtitle2" component="h1" color="black">
                        Describe your feedback
                    </Typography>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border-2 border-black focus:outline-none focus:border-blue-500 rounded-md p-3 placeholder:text-gray-800 h-[150px]"
                        placeholder="Tell us what prompted this feedback..."
                    />

                    <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
                        Please don’t include any sensitive information
                    </Typography>
                </Stack>

                <Stack>
                    {
                        !approvedScreenshot && <Stack direction="column" gap="10px" marginTop="20px">
                            <Typography variant="body2">
                                A screenshot will help us better understand your feedback. (optional)
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{ textTransform: "none", gap: "8px" }}
                                onClick={handleScreenshot}
                            >
                                <RiComputerLine size={16} />
                                Capture screenshot
                            </Button>
                        </Stack>
                    }
                    {approvedScreenshot && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Attached screenshot</Typography>
                            <Stack
                                sx={{
                                    width: "100%",
                                    border: "2px solid black",
                                    borderRadius: "5px",
                                    marginTop: "5px",
                                    position: "relative",
                                }}
                            >
                                {/* Display the screenshot */}
                                <img
                                    src={approvedScreenshot}
                                    alt="Approved Screenshot"
                                    style={{
                                        width: "100%",
                                        borderRadius: "5px",
                                        display: "block",
                                    }}
                                />

                                {/* Buttons overlay */}
                                <Button
                                    className="flex gap-2 items-center w-fit"
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "70%",
                                        transform: "translate(-50%, -50%)",
                                        textTransform: "none",
                                        backgroundColor: "white",
                                        boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                                    }}
                                >
                                    <GoPencil size={18} />
                                    Highlight or Hide Info
                                </Button>

                                <Button
                                    sx={{
                                        position: "absolute",
                                        top: "-15px",
                                        right: "-10px",
                                        minWidth: "43px",
                                        height: "43px",
                                        color: "red",
                                        padding: 0,
                                        borderRadius: "50%",
                                        background: "white",
                                        boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                                    }}
                                >
                                    <ToolTip
                                        TitleToolTip="Remove screenshot"
                                        onClick={() => {
                                            setApprovedScreenshot(null);
                                        }}
                                    >
                                        <MdDeleteOutline />
                                    </ToolTip>
                                </Button>

                            </Stack>
                        </Box>

                    )}
                    <Stack marginTop="25px">
                        <Stack direction="row" alignItems="center">
                            <Checkbox
                                checked={emailUpdates}
                                onChange={(e) => setEmailUpdates(e.target.checked)}
                            />
                            <Typography variant="body2">
                                We may email you for more information or updates
                            </Typography>
                        </Stack>
                        <Typography variant="caption">
                            Some account and system information may be sent to Google. We will
                            use it to fix problems and improve our services, subject to our
                            Privacy Policy and Terms of Service. We may email you for more
                            information or updates. Go to Legal Help to ask for content changes
                            for legal reasons
                        </Typography>
                    </Stack>
                </Stack>

                <Stack>
                    <Button
                        disabled={feedback.length === 0 || emailUpdates === false || approvedScreenshot === null}
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
            <Drawer anchor="right" open={openSlider}>
                {DrawerList}
            </Drawer>

            {/* Modal for screenshot approval */}
            <Modal
                open={modalOpen}
                onClose={handleCancel}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        background: "white",
                        p: 4,
                        top: "15px",
                        position: "absolute",
                        borderRadius: 2,
                        width: "90%",
                        maxWidth: "600px",
                        boxShadow: 24,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Screenshot Captured
                    </Typography>
                    {screenshot && (
                        <img
                            src={screenshot}
                            alt="Screenshot"
                            style={{
                                width: "100%",
                                maxHeight: "300px",
                                marginBottom: "20px",
                                objectFit: "contain",
                                border: "1px solid gray",
                                borderRadius: "5px"
                            }}
                        />
                    )}
                    <Stack direction="row" justifyContent="end" spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAllow}
                            sx={{
                                textTransform: "none",
                                paddingX: "30px"
                            }}
                        >
                            Allow
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                textTransform: "none",
                                paddingX: "30px"
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
