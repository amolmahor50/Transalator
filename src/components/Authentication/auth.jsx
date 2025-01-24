import { auth, googleProvider, facebookProvider } from "../../lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

// get user 
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// login with google
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        localStorage.setItem("user", JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
        toast("Login Successfully..", {
            action: {
                label: "Close"
            }
        })
    } catch (error) {
        console.error("Error during login:", error.message);
        toast("Login failed! Please try again.", {
            action: {
                label: "Close"
            }
        })
    }
};

// login with facebook
export const loginWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;

        // Save user details in localStorage
        localStorage.setItem("user", JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));

        toast("Login Successfully..", {
            action: {
                label: "Close"
            }
        })
    } catch (error) {
        console.error("Error during Facebook login:", error.message);
        toast("Login failed! Please try again.", {
            action: {
                label: "Close"
            }
        })
    }
};

// logout account
export const logout = async () => {
    try {
        await signOut(auth);

        localStorage.removeItem("user");

        toast("Logged out successfully!", {
            action: {
                label: "Close"
            }
        })
    } catch (error) {
        console.error("Error during logout:", error.message);
        toast("Logout failed! Please try again.", {
            action: {
                label: "Close"
            }
        })
    }
};
