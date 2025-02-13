import Drawer from "@mui/material/Drawer";
import ToolTip from "./ui/ToolTip";
import { IoClose } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { Box, Stack, Checkbox, Button, Typography, Modal } from "@mui/material";
import { useContext, useState } from "react";
import html2canvas from "html2canvas";
import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { toast } from "sonner";
import { db, push, ref } from "../lib/firebaseConfig";
import { getAuth } from "firebase/auth";
import { TranslateContextData } from "../context/TranslateContext";
import { Link } from "react-router-dom";

export default function FeedbackSidebar() {
    const { openSlider, setOpenSlider, loading, setLoading } = useContext(TranslateContextData);
    const [formData, setFormData] = useState({
        feedback: "",
        emailUpdates: false,
        screenshot: null,
        approvedScreenshot: null,
        modalOpen: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Start loading

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            toast.error("User not authenticated", {
                action: {
                    label: "Close",
                },
            });
            setLoading(false); // Stop loading if user is not authenticated
            return;
        }

        const { feedback, approvedScreenshot } = formData;
        const feedbackRef = ref(db, `users/${user.uid}/feedbackData`);

        try {
            await push(feedbackRef, {
                userId: user.uid,
                feedback,
                approvedScreenshot,
                timestamp: Date.now(),
            });

            toast.success("Feedback sent successfully!", {
                action: {
                    label: "Close",
                },
            });
            setFormData({ feedback: "", emailUpdates: false, approvedScreenshot: null });
            setOpenSlider(false);
        } catch (error) {
            toast.error("Error submitting feedback. Try again.", {
                action: {
                    label: "Close",
                },
            });
        } finally {
            setLoading(false); // Stop loading after completion
        }
    };

    const handleScreenshot = async () => {
        try {
            const drawerElement = document.querySelector(".MuiDrawer-root");

            if (drawerElement) {
                drawerElement.style.visibility = "hidden"; // Use visibility instead of display: none
            }

            const canvas = await html2canvas(document.body);
            setFormData({ ...formData, screenshot: canvas.toDataURL("image/png"), modalOpen: true });

            if (drawerElement) {
                drawerElement.style.visibility = "visible"; // Restore visibility
            }
        } catch (error) {
            toast.error(`Error capturing screenshot:${error}`, {
                action: {
                    label: "Close",
                },
            });
        }
    };


    const handleAllow = () => {
        setFormData({ ...formData, approvedScreenshot: formData.screenshot, modalOpen: false });
    };

    const handleCancel = () => {
        setFormData({ ...formData, modalOpen: false });
    };

    const DrawerList = (
        <Box className="max-w-[420px]" role="presentation">
            <Stack direction="row" width={420} className="flex justify-between items-center shadow-lg px-4 pt-2 pb-3 fixed top-0 h-14 z-50 bg-white">
                <Typography variant="h6" component="h1" color="black">Send feedback to Google</Typography>
                <ToolTip TitleToolTip="Close" onClick={() => setOpenSlider(false)}><IoClose /></ToolTip>
            </Stack>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 3, marginTop: "60px" }}>
                <Stack direction="column" gap="5px">
                    <Typography variant="subtitle2" component="h1" color="black">Describe your feedback</Typography>
                    <textarea
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        className="border-2 border-black focus:outline-none focus:border-blue-500 rounded-md p-3 placeholder:text-gray-800 h-[150px]"
                        placeholder="Tell us what prompted this feedback..."
                    />
                    <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
                        Please don’t include any sensitive information
                    </Typography>
                </Stack>

                <Stack>
                    {!formData.approvedScreenshot && (
                        <Stack direction="column" gap="10px" marginTop="20px">
                            <Typography variant="body2">A screenshot will help us better understand your feedback. (optional)</Typography>
                            <Button variant="outlined" sx={{ textTransform: "none", gap: "8px" }} onClick={handleScreenshot}>
                                <RiComputerLine size={16} /> Capture screenshot
                            </Button>
                        </Stack>
                    )}

                    {formData.approvedScreenshot && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Attached screenshot</Typography>
                            <Stack sx={{ width: "100%", border: "2px solid black", borderRadius: "5px", marginTop: "5px", position: "relative" }}>
                                <img src={formData.approvedScreenshot} alt="Approved Screenshot" style={{ width: "100%", borderRadius: "5px", display: "block" }} />
                                <Button className="flex gap-2 items-center w-fit" sx={{ position: "absolute", top: "50%", left: "50%", width: "70%", transform: "translate(-50%, -50%)", textTransform: "none", backgroundColor: "white", boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                                    <GoPencil size={18} /> Highlight or Hide Info
                                </Button>
                                <Button sx={{ position: "absolute", top: "-15px", right: "-10px", minWidth: "43px", height: "43px", color: "red", padding: 0, borderRadius: "50%", background: "white", boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }} onClick={() => setFormData({ ...formData, approvedScreenshot: null })}>
                                    <ToolTip TitleToolTip="Remove screenshot"><MdDeleteOutline /></ToolTip>
                                </Button>
                            </Stack>
                        </Box>
                    )}

                    <Stack marginTop="25px">
                        <Stack direction="row" alignItems="center">
                            <Checkbox checked={formData.emailUpdates} onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })} />
                            <Typography variant="body2">We may email you for more information or updates</Typography>
                        </Stack>
                        <Typography variant="caption">
                            Some account and system information may be sent to Google. We will use it to fix problems and improve our services, subject to our
                            <Link to="https://policies.google.com/privacy?hl=en" className="text-blue-800"> Privacy Policy </Link>
                            and <Link to="https://policies.google.com/terms?hl=en" className="text-blue-800"> Terms of Service </Link>
                            We may email you for more information or updates. Go to <Link to="https://support.google.com/legal/answer/3110420?hl=en&authuser=0" className="text-blue-800"> Legal Help </Link> to ask for content changes for legal reasons.
                        </Typography>
                    </Stack>
                </Stack>

                <Stack>
                    <Button disabled={formData.feedback.length === 0 || !formData.emailUpdates || !formData.approvedScreenshot} variant="contained" color="primary" onClick={handleSubmit}>
                        Send
                    </Button>
                </Stack>
            </Box>
        </Box>
    );

    return (
        <div>
            <Drawer anchor="right" open={openSlider}>{DrawerList}</Drawer>

            <Modal open={formData.modalOpen} onClose={handleCancel} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ background: "white", p: 4, top: "15px", position: "absolute", borderRadius: 2, width: "90%", maxWidth: "600px", boxShadow: 24, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>Screenshot Captured</Typography>
                    {formData.screenshot && (
                        <img src={formData.screenshot} alt="Screenshot" style={{ width: "100%", maxHeight: "300px", marginBottom: "20px", objectFit: "contain", border: "1px solid gray", borderRadius: "5px" }} />
                    )}
                    <Stack direction="row" justifyContent="end" spacing={2}>
                        <Button variant="contained" color="primary" onClick={handleAllow} sx={{ textTransform: "none", paddingX: "30px" }}>Allow</Button>
                        <Button variant="outlined" onClick={handleCancel} sx={{ textTransform: "none", paddingX: "30px" }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
