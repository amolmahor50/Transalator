import Navbar from "./Navbar";
import { toast } from "sonner"
import { useContext, useState } from "react";
import { TranslateContextData } from "../context/TranslateContext";
import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup } from "firebase/auth";
import { db, ref, remove, firebaseStore, auth, deleteDoc, doc, deleteUser } from "../lib/firebaseConfig"; // Ensure correct Firebase imports
import { logout } from "../components/Authentication/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Setting() {
    const { setUser } = useContext(TranslateContextData);
    const Navigate = useNavigate();
    const [password, setPassword] = useState("");

    const user = auth.currentUser;

    // parmanently deletd account and deletd data all for user and navigate the login page
    const handleDeletedAccount = async () => {

        try {
            // Step 1: Re-authenticate the user
            if (user.providerData[0].providerId === "password") {
                // If user signed in with email & password, ask for password
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
            localStorage.removeItem("savedEmail");

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
        <div>
            <Navbar />
            <Card className="mt-16 max-w-5xl mx-auto border-none shadow-none">
                <CardHeader>
                    <CardTitle className="sm:text-4xl text-2xl border-b-2 pb-4">Setting</CardTitle>
                </CardHeader>
                <CardContent>
                    {user && user.providerData.length > 0 ? (
                        user.providerData[0].providerId !== "password" ? (
                            <AlertDialog className="mx-10">
                                <AlertDialogTrigger className="text-red-800 p-2 border-2 rounded-lg w-fit text-sm">
                                    Permanently Delete Account
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
                                        <AlertDialogAction onClick={handleDeletedAccount} className="bg-blue-800 hover:bg-blue-500">
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild className="p-2 border-2 rounded-lg w-fit">
                                    <Button variant="outline" className="text-red-800 p-2 border-2 rounded-lg w-fit text-sm">
                                        Permanently Delete Account
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            Enter your password to confirm account deletion:
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter Your Logged in Password"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" variant="blue" onClick={handleDeletedAccount}>
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )
                    ) : (
                        <p className="text-center text-red-600">User data not found. Please log in again.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
