import React, { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { RiFacebookFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"
import { getUser, loginWithFacebook, loginWithGoogle } from './auth';
import { Link, useNavigate } from 'react-router-dom';
import { TranslateContextData } from '../../context/TranslateContext';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'sonner';

export default function CreateAccount() {
    const { setUser } = useContext(TranslateContextData);
    const Navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
        setUser(getUser());
        Navigate("/translator");
    }

    const handleFacebookLogin = async () => {
        await loginWithFacebook();
        setUser(getUser());
        Navigate("/translator");
    }

    // Handle form submission
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        // Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const auth = getAuth();

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user's profile with their name
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            Navigate("/");
            toast("Created Account log in now..", {
                action: {
                    label: "Close"
                }
            })
        } catch (err) {
            toast("Email Already In used ", {
                action: {
                    label: "Close"
                }
            })
        }
    };

    return (
        <div className="max-w-sm mx-auto my-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create Account</CardTitle>
                    <CardDescription>
                        Create Account With Google or with Facebook
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateAccount}>
                        <div className="grid gap-4">
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full" onClick={handleFacebookLogin}>
                                    <RiFacebookFill />
                                    Login with Facebook
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                                    <RiGoogleFill />
                                    Login with Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">First Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="First Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" required />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I have read the{" "}
                                    <Link to="" className="text-blue-800">Terms and Conditions</Link>
                                </Label>
                            </div>
                            {error && <p className="text-red-500 text-sm w-fit p-2 rounded-sm bg-accent">{error}</p>}
                            <Button variant="blue" type="submit" className="w-full">
                                Create Account
                            </Button>
                        </div>
                        <div className="text-center text-sm mt-2">
                            Your Have Already account
                            <Link to="/" className="underline underline-offset-4 ml-2">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
