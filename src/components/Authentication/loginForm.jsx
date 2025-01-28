import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiFacebookFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
import { getUser, loginWithEmail, loginWithFacebook, loginWithGoogle } from "./auth";
import { useContext, useState } from "react";
import { TranslateContextData } from "../../context/TranslateContext";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const { setUser } = useContext(TranslateContextData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const Navigate = useNavigate();

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

  const handleEmailWithLogin = async (e) => {
    e.preventDefault();
    await loginWithEmail(email, password);
    setUser(getUser());
    Navigate("/translator");
  }

  return (
    <div className="max-w-sm mx-auto my-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Facebook or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailWithLogin}>
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
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
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
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

export default LoginForm
