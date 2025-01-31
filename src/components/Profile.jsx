import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TranslateContextData } from "../context/TranslateContext";
import { Avatar } from "@mui/material";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { firebaseStore, doc, getDoc, setDoc } from "../lib/firebaseConfig";
import { toast } from "sonner";

export default function Profile() {
    const { user } = useContext(TranslateContextData);

    // State for form inputs & validation errors
    const [formData, setFormData] = useState({
        name: user?.FirstName || "",
        lastName: user?.LastName || "",
        email: user?.email || "",
        dateOfBirth: user?.dateOfBirth || "",
        mobile: user?.mobile || "",
        gender: user?.gender || "",
        address: user?.address || "",
    });

    const [errors, setErrors] = useState({}); // Store validation errors

    // Fetch user data from Firestore when component mounts
    useEffect(() => {
        if (user?.uid) {
            const fetchUserData = async () => {
                try {
                    const userRef = doc(firebaseStore, "users", user.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        setFormData((prev) => ({ ...prev, ...userDoc.data() })); // Merge existing data
                    } else {
                        toast.info("No user data found!", {
                            action: {
                                label: "Close",
                            },
                        });
                    }
                } catch (error) {
                    toast.error(`Error fetching user data:${error}`, {
                        action: {
                            label: "Close",
                        },
                    });
                }
            };

            fetchUserData();
        }
    }, [user]);

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMsg = "";

        if (name === "mobile") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, [name]: formattedValue }));
            if (formattedValue.length !== 10) {
                errorMsg = "Mobile number must be exactly 10 digits.";
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (!value.trim()) {
                errorMsg = `${name.replace(/([A-Z])/g, " $1")} is required.`;
            }
        }

        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    // Handle radio button change
    const handleGenderChange = (value) => {
        setFormData((prev) => ({ ...prev, gender: value }));
        setErrors((prev) => ({ ...prev, gender: "" }));
    };

    // Validate entire form before submission
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name?.trim()) newErrors.name = "First Name is required.";
        if (!formData.lastName?.trim()) newErrors.lastName = "Last Name is required.";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
        if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = "Mobile number must be 10 digits.";
        if (!formData.address?.trim()) newErrors.address = "Address is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission and update Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const userRef = doc(firebaseStore, "users", user.uid);
                await setDoc(userRef, {
                    FirstName: formData.name,
                    LastName: formData.lastName,
                    email: formData.email,
                    dateOfBirth: formData.dateOfBirth,
                    mobile: formData.mobile,
                    gender: formData.gender,
                    address: formData.address,
                }, { merge: true });
                toast.success("Profile Updated Successfully!", {
                    action: {
                        label: "Close",
                    },
                });
                console.log("user saved profile:", formData)
            } catch (error) {
                toast.error(`Error updating profile:${error}`, {
                    action: {
                        label: "Close",
                    },
                });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <Card className="mt-20 max-w-5xl mx-auto border-none shadow-none">
                <CardHeader>
                    <CardTitle className="sm:text-4xl text-2xl">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Profile Picture */}
                    <div className="flex gap-4 items-center pb-4 border-b-2">
                        <Avatar
                            alt="Profile Picture"
                            src={user.photo}
                            sx={{ width: 100, height: 100 }}
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-xl font-semibold">Profile Picture</span>
                            <span className="text-gray-600 text-sm">Supports PNGs, JPEGs under 3MB</span>
                            <div className="flex items-center gap-2">
                                <Button variant="blue" size="sm" className="w-fit">
                                    <GoPencil />
                                    <span>Edit</span>
                                </Button>
                                <Button variant="destructive" size="sm" className="w-fit">
                                    <MdDeleteOutline />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details Form */}
                    <form onSubmit={handleSubmit} className="grid gap-6 mt-6">
                        <h6 className="text-xl font-semibold">Personal Details</h6>

                        {/* Name Fields */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">First Name</Label>
                                <Input name="name" placeholder="First Name" type="text" value={formData.name} onChange={handleChange} />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input name="lastName" placeholder="Last Name" type="text" value={formData.lastName} onChange={handleChange} />
                                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                            </div>
                        </div>

                        {/* Email & dateOfBirth */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" disabled type="email" value={formData.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                                <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                                {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
                            </div>
                        </div>

                        {/* Mobile & Gender */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input name="mobile" placeholder="Mobile Number" type="text" value={formData.mobile} onChange={handleChange} />
                                {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="r1" />
                                        <Label htmlFor="r1">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="r2" />
                                        <Label htmlFor="r2">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="r3" />
                                        <Label htmlFor="r3">Other</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="grid sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea name="address" placeholder="Address" rows={3} value={formData.address} onChange={handleChange} className="border p-3 rounded-md shadow-sm" />
                                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end items-end">
                            <Button variant="blue" className="w-fit" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
