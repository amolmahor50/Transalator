import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { sendVerificationLink } from './auth';
import { auth } from '../../lib/firebaseConfig'


export default function ForgotForm() {
    const [email, setEmail] = useState("");
    const [screenLable, setScreenLable] = useState("Enter your email below to reset your password")
    const [sendVarificationScreen, setsendVarificationScreen] = useState(null);
    const Navigate = useNavigate();

    const handleSendVerificationLinkForEmail = async (e) => {
        e.preventDefault();
        setsendVarificationScreen("1254");
        setScreenLable("Check your email and reset password");
        await sendVerificationLink(auth, email);
    }

    return (
        <div className="max-w-sm mx-auto mt-48">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>
                        {screenLable}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        sendVarificationScreen === null ?
                            <form onSubmit={handleSendVerificationLinkForEmail}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button variant="blue" type="submit" className="w-full">
                                        Send Varification Email
                                    </Button>
                                </div>
                                <div className="text-center text-sm mt-4">
                                    If you already have an account?
                                    <Link to="/" className="underline underline-offset-4 ml-2">
                                        Sign In
                                    </Link>
                                </div>
                            </form>
                            :
                            <div className='flex flex-col gap-4'>
                                <Input
                                    disabled
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <CardDescription className="text-red-900">
                                    Check Your Email We have send the reset password link in your email, after reset the password click Continue button
                                </CardDescription>
                                <div className='flex items-center gap-2'>
                                    <Button
                                        variant="blue"
                                        onClick={() => Navigate('/')}
                                    >
                                        Continue
                                    </Button>
                                    <Button variant="outline"
                                        onClick={handleSendVerificationLinkForEmail}
                                    >
                                        Resend
                                    </Button>
                                </div>
                            </div>
                    }
                </CardContent>
            </Card>
        </div >
    )
}
