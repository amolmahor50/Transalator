import { auth, googleProvider, facebookProvider } from "../../lib/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
        toast("Please Put Your correct info.", {
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
        toast("Please Put Your correct info.", {
            action: {
                label: "Close"
            }
        })
    }
};

// login with email and password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details in localStorage
        localStorage.setItem("user", JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
        }));

        toast("Logged out successfully!", {
            action: {
                label: "Close"
            }
        })
    } catch (error) {
        console.error("Error during login:", error.message);
        toast("Please Put Your correct Password and Gmail.", {
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

// sendPasswordResetEmail
export const sendVerificationLink = async (auth, email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        toast("Check your email and reset password. Please check your inbox.", {
            action: {
                label: "Close"
            }
        })
    } catch (error) {
        console.error("Error sending email:", error.message);
        toast(error.message, {
            action: {
                label: "Close"
            }
        })
    }
};
