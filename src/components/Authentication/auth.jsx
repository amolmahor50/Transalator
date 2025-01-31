import { auth, googleProvider, facebookProvider } from "../../lib/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { toast } from "sonner";

// Get user data from localStorage
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// Save the additional profile data to localStorage
const saveUserProfile = (user, additionalInfo) => {
    localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        FullName: user.displayName,
        FirstName: user.displayName?.split(" ")[0] || "", // Assuming FirstName is the first part of displayName
        LastName: user.displayName?.split(" ")[1] || "",  // Assuming LastName is the second part of displayName
        email: user.email,
        photo: user.photoURL,
        mobile: additionalInfo.mobile || "",
        address: additionalInfo.address || "",
        gender: additionalInfo.gender || "",
        dateOfBirth: additionalInfo.dateOfBirth || "",
    }));
};

// Login with Google
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Here you can prompt the user to fill additional profile details
        const additionalInfo = {
            mobile: "",   // Replace with data gathered from your form
            address: "",  // Replace with data gathered from your form
            gender: "",   // Replace with data gathered from your form
            dateOfBirth: "", // Replace with data gathered from your form
        };

        // Save user details to localStorage
        saveUserProfile(user, additionalInfo);

        toast("Login Successfully..", {
            action: {
                label: "Close"
            }
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        toast("Please Put Your correct info.", {
            action: {
                label: "Close"
            }
        });
    }
};

// Login with Facebook
export const loginWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;

        // Here you can prompt the user to fill additional profile details
        const additionalInfo = {
            mobile: "",   // Replace with data gathered from your form
            address: "",  // Replace with data gathered from your form
            gender: "",   // Replace with data gathered from your form
            dateOfBirth: "", // Replace with data gathered from your form
        };

        // Save user details to localStorage
        saveUserProfile(user, additionalInfo);

        toast("Login Successfully..", {
            action: {
                label: "Close"
            }
        });
    } catch (error) {
        console.error("Error during Facebook login:", error.message);
        toast("Please Put Your correct info.", {
            action: {
                label: "Close"
            }
        });
    }
};

// Login with Email and Password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Here you can prompt the user to fill additional profile details
        const additionalInfo = {
            mobile: "",   // Replace with data gathered from your form
            address: "",  // Replace with data gathered from your form
            gender: "",   // Replace with data gathered from your form
            dateOfBirth: "", // Replace with data gathered from your form
        };

        // Save user details to localStorage
        saveUserProfile(user, additionalInfo);

        toast("Login Successfully..", {
            action: {
                label: "Close"
            }
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        toast("Please Put Your correct Password and Gmail.", {
            action: {
                label: "Close"
            }
        });
    }
};

// Logout account
export const logout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("user"); // Remove user data from localStorage

        toast("Logged out successfully!", {
            action: {
                label: "Close"
            }
        });
    } catch (error) {
        console.error("Error during logout:", error.message);
        toast("Logout failed! Please try again.", {
            action: {
                label: "Close"
            }
        });
    }
};

// Send Password Reset Email
export const sendVerificationLink = async (auth, email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        toast("Check your email and reset password. Please check your inbox.", {
            action: {
                label: "Close"
            }
        });
    } catch (error) {
        console.error("Error sending email:", error.message);
        toast(error.message, {
            action: {
                label: "Close"
            }
        });
    }
};
