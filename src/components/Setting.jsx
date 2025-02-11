import Navbar from "./Navbar";
import { Box, Stack, Typography } from "@mui/material";
import { toast } from "sonner"
import { useContext } from "react";
import { TranslateContextData } from "../context/TranslateContext";
import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup } from "firebase/auth";
import { db, ref, remove, firebaseStore, auth, deleteDoc, doc, deleteUser } from "../lib/firebaseConfig"; // Ensure correct Firebase imports
import { logout } from "../components/Authentication/auth";
import { useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Setting() {
    const { setUser } = useContext(TranslateContextData);
    const Navigate = useNavigate()

    // parmanently deletd account and deletd data all for user and navigate the login page
    const handleDeletedAccount = async () => {
        const user = auth.currentUser;

        try {
            // Step 1: Re-authenticate the user
            if (user.providerData[0].providerId === "password") {
                // If user signed in with email & password, ask for password
                const password = prompt("Enter your password to confirm account deletion:");
                if (!password) {
                    toast.error("Password is required for authentication.", {
                        action: {
                            label: "Close",
                        },
                    });
                    return;
                }

                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);
            } else {
                // If user signed in with Google, use popup re-authentication
                const provider = new GoogleAuthProvider();
                await reauthenticateWithPopup(user, provider);
            }

            // Step 2: Delete from Firestore
            await deleteDoc(doc(firebaseStore, "users", user.uid));

            // Step 3: Delete from Realtime Database
            await remove(ref(db, `users/${user.uid}`));

            // Step 4: Delete user from Firebase Authentication
            await deleteUser(user);

            // Step 5: Clear local data
            localStorage.removeItem("user");

            // navigate to the login page and log out account 
            await logout();
            setUser(null);
            Navigate("/")

            toast.success("Your account has been permanently deleted!", {
                action: {
                    label: "Close",
                },
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(`Password Wrong please put the correct password`, {
                action: {
                    label: "Close",
                },
            });
        }
    }

    return (
        <div className="">
            <Navbar />
            <Box className="mt-20 px-4 max-w-5xl mx-auto">
                <Typography variant="h5">
                    Setting
                </Typography>
                <Stack direction="column" marginTop="20px">
                    <AlertDialog className="mx-10">
                        <AlertDialogTrigger className="text-red-800 p-2 border-2 rounded-lg w-fit">
                            Permanently Deleted Account
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeletedAccount} className="bg-blue-800 hover:bg-blue-500">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </Stack>
            </Box>
        </div>
    )
}
