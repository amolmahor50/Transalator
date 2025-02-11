import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiGoogleFill } from "react-icons/ri";
import {
  getUser,
  loginWithEmail,
  loginWithGoogle,
} from "./auth";
import { useContext, useState } from "react";
import { TranslateContextData } from "../../context/TranslateContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function LoginForm() {
  const { setUser } = useContext(TranslateContextData);
  const Navigate = useNavigate();

  // Retrieve last email from localStorage (if available)
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");

  // Save email to localStorage (on login)
  const saveEmailToStorage = (newEmail) => {
    localStorage.setItem("savedEmail", newEmail);
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      const user = getUser();
      if (user) {
        setUser(user);
        saveEmailToStorage(user.email);
        Navigate("/translator");
      } else {
        toast.error("Failed to retrieve user after Google login.", {
          action: {
            label: "Close",
          },
        });
      }
    } catch (error) {
      toast.error(`Google login failed:${error}`, {
        action: {
          label: "Close",
        },
      });
    }
  };

  // Handle Email and Password login
  const handleEmailWithLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      const user = getUser();
      if (user) {
        setUser(user);
        saveEmailToStorage(email);
        Navigate("/translator");
      } else {
        toast.error("Failed to retrieve user after email login.", {
          action: {
            label: "Close",
          },
        });
      }
    } catch (error) {
      toast.error(`Email login failed:${error}`, {
        action: {
          label: "Close",
        },
      });
    }
  };

  const handleShow_hide_password = (type) => {
    if (type === "password") {
      setTypePassword("text");
    }
    else if (type === "text") {
      setTypePassword("password");
    }
  }

  return (
    <div className="max-w-sm mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Login with your Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailWithLogin}>
              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <RiGoogleFill color="orange" />
                  Login with Google
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-pass"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative flex items-center">
                      <Input
                        type={typePassword}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span className="absolute right-4 cursor-pointer">
                        {
                          typePassword === "password" ?
                            <IoEyeOutline size={20} onClick={() => handleShow_hide_password("password")} />
                            : <IoEyeOffOutline size={20} onClick={() => handleShow_hide_password("text")} />
                        }
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="blue"
                    type="submit"
                    className="w-full"
                    disabled={email === "" || password === ""}
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>.
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
